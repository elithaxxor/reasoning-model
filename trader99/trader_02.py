import os, base64, json, logging, time
from pathlib import Path
from dotenv import load_dotenv
import ccxt, talib
from openai import OpenAI
from concurrent.futures import ThreadPoolExecutor, as_completed

# Setup logging
^[logging.basicConfig(filename='model_output.log', level=logging.INFO,]({"attribution":{"attributableIndex":"0-1"}})
                    ^[format='%(asctime)s %(levelname)s:%(message)s')]({"attribution":{"attributableIndex":"0-2"}})

load_dotenv()
^[API_KEY = os.getenv("API_KEY")]({"attribution":{"attributableIndex":"0-3"}})
client = OpenAI()

^[IMAGE_DIR = Path("/Users/a-robot/Desktop/untitled folder")]({"attribution":{"attributableIndex":"0-4"}})
MAX_RETRIES = 3
EXCHANGES = {
    ^["binance": ccxt.binance({'enableRateLimit': True}),]({"attribution":{"attributableIndex":"0-5"}})
    ^["coinbase": ccxt.coinbasepro({'enableRateLimit': True}),]({"attribution":{"attributableIndex":"0-6"}})
    ^["kraken": ccxt.kraken({'enableRateLimit': True}),]({"attribution":{"attributableIndex":"0-7"}})
    ^["btcc": ccxt.btcc({'enableRateLimit': True})]({"attribution":{"attributableIndex":"0-8"}})
}

^[def encode_images_from_dir(directory: Path, limit=10) -> list:]({"attribution":{"attributableIndex":"0-9"}})
    imgs = []
    ^[for i, f in enumerate(directory.iterdir()):]({"attribution":{"attributableIndex":"0-10"}})
        ^[if i >= limit: break]({"attribution":{"attributableIndex":"0-11"}})
        ^[if f.is_file() and f.suffix.lower() in ['.jpg', '.jpeg', '.png']:]({"attribution":{"attributableIndex":"0-12"}})
            ^[data = base64.b64encode(f.read_bytes()).decode('utf-8')]({"attribution":{"attributableIndex":"0-13"}})
            ^[imgs.append({"filename": f.name, "data": data})]({"attribution":{"attributableIndex":"0-14"}})
    return imgs

^[def retry_with_backoff(func, *args, **kwargs):]({"attribution":{"attributableIndex":"0-15"}})
    ^[for attempt in range(MAX_RETRIES):]({"attribution":{"attributableIndex":"0-16"}})
        try:
            ^[return func(*args, **kwargs)]({"attribution":{"attributableIndex":"0-17"}})
        ^[except Exception as e:]({"attribution":{"attributableIndex":"0-18"}})
            ^[logging.warning(f"Retry {attempt+1}/{MAX_RETRIES} failed: {e}")]({"attribution":{"attributableIndex":"0-19"}})
            ^[if attempt == MAX_RETRIES-1:]({"attribution":{"attributableIndex":"0-20"}})
                raise
            ^[time.sleep(2 ** attempt)]({"attribution":{"attributableIndex":"0-21"}})

^[def model_call(model: str, prompt: str) -> dict:]({"attribution":{"attributableIndex":"0-22"}})
    ^[start = time.time()]({"attribution":{"attributableIndex":"0-23"}})
    try:
        resp = retry_with_backoff(
            ^[client.chat.completions.create,]({"attribution":{"attributableIndex":"0-24"}})
            model=model,
            ^[messages=[{"role": "user", "content": prompt}],]({"attribution":{"attributableIndex":"0-25"}})
            temperature=0
        )
        ^[text = resp.choices[0].message.content]({"attribution":{"attributableIndex":"0-26"}})
    ^[except Exception as e:]({"attribution":{"attributableIndex":"0-27"}})
        ^[text = json.dumps({"error": str(e)})]({"attribution":{"attributableIndex":"0-28"}})
    ^[elapsed = time.time() - start]({"attribution":{"attributableIndex":"0-29"}})
    price_rate = {
        ^["o4-mini-high": 4.4e-6,]({"attribution":{"attributableIndex":"0-30"}})
        ^["gpt-4.1": 8e-6,  # estimates based on $8/1M tokens]({"attribution":{"attributableIndex":"0-31"}})  [oai_citation:0‡en.wikipedia.org](https://en.wikipedia.org/wiki/GPT-4o?utm_source=chatgpt.com) [oai_citation:1‡businessinsider.com](https://www.businessinsider.com/which-chatgpt-model-is-best?utm_source=chatgpt.com) [oai_citation:2‡openai.com](https://openai.com/api/pricing/?utm_source=chatgpt.com) [oai_citation:3‡artificialanalysis.ai](https://artificialanalysis.ai/providers/openai?utm_source=chatgpt.com)
        "o3-pro": 42e-6,
        "gpt-4.5": 150e-6
    }.get(model, 10e-6)
    est_cost = round(elapsed * price_rate, 6)
    return {"model": model, "prompt": prompt, "response": text,
            "metrics": {"elapsed_s": elapsed, "est_cost_usd": est_cost}}

def generate_signal(exchange, pair: str, user_prompt: str, images: list):
    try:
        ohlcv = retry_with_backoff(exchange.fetch_ohlcv, pair, '5m', 1000)
        rsi = talib.RSI([x[4] for x in ohlcv])
        assert len(rsi) >= 50
    except Exception as e:
        err = f"OHLCV/RSI error for {pair}: {e}"
        logging.error(err)
        return pair, {"error": err}

    ta_prompt = f"RSI divergence check for {pair}: {rsi[-50:]}"
    macro_prompt = f"VWAP/macro pattern analysis for {pair}"
    options_prompt = f"Calculate Black‑Scholes params for {pair}"
    sentiment_prompt = f"Fear/greed sentiment from last 200 tweets for {pair}"
    if images:
        img_sum = "\n".join([f"{img['filename'][:20]}:{img['data'][:50]}..." for img in images])
        ta_prompt += "\nAttached images:\n" + img_sum

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
    logging.info(f"Saved structured JSON for {pair}")

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

def main():
    check_api_key_valid()
    exchange = select_exchange()
    pairs = [p.strip().upper() for p in input("Pairs (comma-separated): ").split(",") if p.strip()]
    prompt = input("Enter your custom prompt: ")
    images = encode_images_from_dir(IMAGE_DIR) if input("Add pictures? (y/n): ").lower().startswith("y") else []

    success, fail = 0, 0
    print("\n⏳ Processing...")
    with ThreadPoolExecutor(max_workers=4) as exec:
        futures = [exec.submit(generate_signal, exchange, p, prompt, images) for p in pairs]
        for fut in as_completed(futures):
            pair, res = fut.result()
            print(f"\nResult for {pair}:", json.dumps(res, indent=2))
            (fail if "error" in res else lambda: None)()
            if "error" in res: fail += 1
            else: success += 1

    print(f"\n✅ Done: {success} succeeded, {fail} failed.")

if __name__ == "__main__":
    main()