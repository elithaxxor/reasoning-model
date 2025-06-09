import os, base64, json, logging, time
from pathlib import Path
from dotenv import load_dotenv
import ccxt, talib
from openai import OpenAI
from concurrent.futures import ThreadPoolExecutor, as_completed
from rich.console import Console
from rich.table import Table
from rich.progress import Progress, SpinnerColumn, BarColumn, TimeElapsedColumn, TextColumn
import numpy as np  # Ensure this is at the top
import webbrowser
from datetime import datetime

# Setup logging
logging.basicConfig(filename='model_output.log', level=logging.INFO,
                    format='%(asctime)s %(levelname)s:%(message)s')

load_dotenv()
API_KEY = os.getenv("API_KEY")
client = OpenAI()

IMAGE_DIR = Path("/Users/a-robot/Desktop/untitled folder")
MAX_RETRIES = 3
console = Console()

EXCHANGES = {
    "binance": ccxt.binance({'enableRateLimit': True}),
    "coinbase": ccxt.coinbase({'enableRateLimit': True}),
    "kraken": ccxt.kraken({'enableRateLimit': True}),
    "btcc": ccxt.bit2c({'enableRateLimit': True})
}

def encode_images_from_dir(directory: Path, limit=10) -> list:
    imgs = []
    for i, f in enumerate(directory.iterdir()):
        if i >= limit: break
        if f.is_file() and f.suffix.lower() in ['.jpg', '.jpeg', '.png']:
            data = base64.b64encode(f.read_bytes()).decode('utf-8')
            imgs.append({"filename": f.name, "data": data})
    return imgs

def retry_with_backoff(func, *args, **kwargs):
    for attempt in range(MAX_RETRIES):
        try:
            return func(*args, **kwargs)
        except Exception as e:
            logging.warning(f"Retry {attempt+1}/{MAX_RETRIES} failed: {e}")
            if attempt == MAX_RETRIES-1:
                raise
            time.sleep(2 ** attempt)

def model_call(model: str, prompt: str) -> dict:
    start = time.time()
    try:
        resp = retry_with_backoff(
            client.chat.completions.create,
            model=model,
            messages=[{"role": "user", "content": prompt}],
            temperature=0
        )
        text = resp.choices[0].message.content
    except Exception as e:
        text = json.dumps({"error": str(e)})
    elapsed = time.time() - start
    price_rate = {
        "o4-mini": 4.4e-6,
        "o4-mini-2025-04-16": 4.4e-6,
        "gpt-4.1": 8e-6,
        "o3-pro": 42e-6,
        "o1-pro": 20e-6,
        "gpt-4.5-preview-2025-02-27": 150e-6,
        "gpt-4o-mini-realtime-preview": 10e-6,
        "o3-mini": 2.5e-6,
        "o4-mini-realtime-preview": 2.5e-6,
        "gpt-4o-realtime-preview-2025-06-03": 10e-6,
        
    }.get(model, 10e-6)
    est_cost = round(elapsed * price_rate, 6)
    return {"model": model, "prompt": prompt, "response": text,
            "metrics": {"elapsed_s": elapsed, "est_cost_usd": est_cost}}

def generate_signal(exchange, pair: str, user_prompt: str, images: list):
    try:
        ohlcv = retry_with_backoff(exchange.fetch_ohlcv, pair, '5m', 1000)
        closes = np.array([x[4] for x in ohlcv], dtype=np.float64)
        rsi = talib.RSI(closes)
        assert len(rsi) >= 50
    except Exception as e:
        err = f"OHLCV/RSI error for {pair}: {e}"
        logging.error(err)
        return pair, {"pair": pair, "error": err}
    ta_prompt = f"RSI divergence check for {pair}: {rsi[-50:]}"
    macro_prompt = f"VWAP/macro pattern analysis for {pair}"
    options_prompt = f"Calculate Black‑Scholes params for {pair}"
    sentiment_prompt = f"Fear/greed sentiment from last 200 tweets for {pair}"
    if images:
        img_sum = "\n".join([f"{img['filename'][:20]}:{img['data'][:50]}..." for img in images])
        ta_prompt += "\nAttached images:\n" + img_sum

   # ta = model_call("o4-mini", ta_prompt)
   # macro = model_call("o4-mini-realtime-preview", macro_prompt)
   # options = model_call("o3-mini", options_prompt)
   # sentiment = model_call("gpt-4o-realtime-preview-2025-06-03", sentiment_prompt)

    ta = model_call("o4-mini-high", ta_prompt)
    macro = model_call("gpt-4.1", macro_prompt)
    options = model_call("o3-pro", options_prompt)
    sentiment = model_call("gpt-4.5", sentiment_prompt)

    def vote(text): return "bull" in text.lower()
    votes = sum(map(vote, [ta["response"], options["response"], sentiment["response"]]))
    final = "BUY" if votes >= 2 else "SELL" if votes == 0 else "HOLD"

    result = {
        "pair": pair,
        "ta": ta, "macro": macro, "options": options, "sentiment": sentiment,
        "consensus_signal": final,
        "metrics": {
            "ta": ta["metrics"], "macro": macro["metrics"],
            "options": options["metrics"], "sentiment": sentiment["metrics"]
        }
    }
    with open(f"{pair.replace('/', '-')}_analysis.json", "w") as f:
        json.dump(result, f, indent=2)
    return pair, result

def check_api_key_valid():
    try:
        client.models.list()
        print("✅ OpenAI API key is valid.")
    except Exception as e:
        print("❌ Invalid OpenAI API key.")
        logging.error(f"API key validation failed: {e}")
        exit(1)

def select_exchange():
    print("Choose exchange:")
    for i, name in enumerate(EXCHANGES, 1):
        print(f"{i}. {name}")
    choice = input("Enter number: ").strip()
    try:
        sel = list(EXCHANGES.values())[int(choice)-1]
        print(f"Using exchange: {list(EXCHANGES.keys())[int(choice)-1]}")
        return sel
    except:
        print("Invalid. Exiting.")
        exit(1)






def display_summary(results):
    table = Table(title="Batch Run Summary")
    table.add_column("Pair", style="cyan", no_wrap=True)
    table.add_column("Signal", style="bold")
    table.add_column("Elapsed (s)", justify="right")
    table.add_column("Cost ($)", justify="right")
    table.add_column("Status", justify="center")
    
    total_time = total_cost = 0.0
    success = failure = 0

    for res in results:
        pair = res["pair"]
        if "error" in res:
            status = "[red]FAIL[/]"
            elapsed = cost = 0
            failure += 1
        else:
            status = "[green]OK[/]"
            success += 1
            elapsed = sum(m["elapsed_s"] for m in res["metrics"].values())
            cost = sum(m["est_cost_usd"] for m in res["metrics"].values())
            total_time += elapsed
            total_cost += cost

        table.add_row(pair, res.get("consensus_signal", "-"),
                      f"{elapsed:.2f}", f"{cost:.4f}", status)

    table.add_row("[bold]TOTAL[/]", f"{success}✅/{failure}❌",
                  f"{total_time:.2f}", f"{total_cost:.4f}", "")
    console.print(table)

    with open("batch_summary.json", "w") as f:
        json.dump({"summary": {"success": success, "failures": failure,
                                "total_cost": total_cost, "total_time": total_time},
                   "results": results}, f, indent=2)




def generate_html_report(results: list):
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    output_path = f"report_{timestamp}.html"
    html = ["<html><head><title>Trading Bot Report</title>",
            "<style>body{font-family:sans-serif;}table{width:100%;border-collapse:collapse;}th,td{padding:8px;border:1px solid #ddd;}th{background:#333;color:#fff;}tr:nth-child(even){background:#f9f9f9}</style>",
            "</head><body>",
            f"<h1>Trading Report - {timestamp}</h1>"]

    for result in results:
        html.append(f"<h2>{result['pair']}</h2>")
        if 'error' in result:
            html.append(f"<p style='color:red'><strong>Error:</strong> {result['error']}</p>")
            continue

        html.append(f"<p><strong>Consensus Signal:</strong> <span style='color:blue'>{result['consensus_signal']}</span></p>")

        for section in ['ta', 'macro', 'options', 'sentiment']:
            section_data = result.get(section, {})
            html.append(f"<h3>{section.upper()} (Model: {section_data.get('model','')})</h3>")
            html.append("<table>")
            html.append("<tr><th>Prompt</th><th>Response</th><th>Time (s)</th><th>Est. Cost ($)</th></tr>")
            html.append(f"<tr><td>{section_data.get('prompt','')}</td><td>{section_data.get('response','')}</td>"
                        f"<td>{section_data.get('metrics',{}).get('elapsed_s','-'):.2f}</td>"
                        f"<td>{section_data.get('metrics',{}).get('est_cost_usd','-'):.5f}</td></tr>")
            html.append("</table><br>")

    html.append("</body></html>")
    with open(output_path, "w") as f:
        f.write("\n".join(html))
    print(f"✅ HTML report saved to {output_path}")
    webbrowser.open(f"file://{os.path.abspath(output_path)}")


def main():
    check_api_key_valid()
    exchange = select_exchange()
    pairs = [p.strip().upper() for p in input("Pairs (comma-separated): ").split(",") if p.strip()]
    prompt = input("Enter your custom prompt: ")
    images = encode_images_from_dir(IMAGE_DIR) if input("Add pictures? (y/n): ").lower().startswith("y") else []

    results_list = []
    with Progress(SpinnerColumn(), TextColumn("{task.fields[task_name]}"),
                  BarColumn(), TimeElapsedColumn()) as progress:
        tasks = {p: progress.add_task(description="", total=None, task_name=p) for p in pairs}

        with ThreadPoolExecutor(max_workers=4) as exec:
            futures = {exec.submit(generate_signal, exchange, p, prompt, images): p for p in pairs}
            for fut in as_completed(futures):
                pair, res = fut.result()
                progress.update(tasks[pair], completed=1)
                results_list.append(res)
                print(f"\nResult for {pair}:", json.dumps(res, indent=2))

    display_summary(results_list)
    generate_html_report(results_list)

if __name__ == "__main__":
    main()

# This script is designed to run as a standalone module.
# It will not execute if imported as a module in another script.
