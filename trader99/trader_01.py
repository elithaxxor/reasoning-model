import os
import base64
import json
import logging
import time
from pathlib import Path
from dotenv import load_dotenv
import requests
import ccxt
import talib
from openai import OpenAI
from concurrent.futures import ThreadPoolExecutor, as_completed

# Setup logging
logging.basicConfig(filename='model_output.log', level=logging.INFO, format='%(asctime)s %(levelname)s:%(message)s')

# Load .env vars
load_dotenv()
API_KEY = os.getenv("API_KEY")

# OpenAI setup
client = OpenAI()

IMAGE_DIR = Path("/Users/a-robot/Desktop/untitled folder")
MAX_RETRIES = 3

# Exchange selection
EXCHANGES = {
    "binance": ccxt.binance({'enableRateLimit': True}),
    "coinbase": ccxt.coinbasepro({'enableRateLimit': True}),
    "kraken": ccxt.kraken({'enableRateLimit': True}),
    "btcc": ccxt.btcc({'enableRateLimit': True})
}

def encode_images_from_dir(directory: Path, limit: int = 5) -> list:
    image_data = []
    for i, file in enumerate(directory.iterdir()):
        if i >= limit:
            break
        if file.is_file() and file.suffix.lower() in ['.jpg', '.jpeg', '.png']:
            with open(file, "rb") as img:
                encoded = base64.b64encode(img.read()).decode("utf-8")
                image_data.append({"filename": file.name, "data": encoded})
    return image_data


def parse_signal(raw_output: str) -> dict:
    try:
        return json.loads(raw_output)
    except json.JSONDecodeError:
        logging.error("Failed to parse JSON from model output.")
        return {"error": "Failed to parse model output as JSON", "raw_output": raw_output}


def retry_with_backoff(func, *args, **kwargs):
    for attempt in range(MAX_RETRIES):
        try:
            return func(*args, **kwargs)
        except Exception as e:
            logging.warning(f"Attempt {attempt + 1} failed: {e}")
            if attempt < MAX_RETRIES - 1:
                time.sleep(2 ** attempt)
            else:
                raise


def generate_signal(exchange, pair: str, user_prompt: str, images: list) -> tuple:
    try:
        ohlcv = retry_with_backoff(exchange.fetch_ohlcv, pair, '5m', 1000)
    except Exception as e:
        logging.error(f"Error fetching OHLCV data from {exchange.id}: {e}")
        return pair, {"error": f"Failed to fetch OHLCV data for {pair} on {exchange.id}", "details": str(e)}

    try:
        rsi = talib.RSI([x[4] for x in ohlcv])
        if len(rsi) < 50:
            raise ValueError("Not enough RSI data")
    except Exception as e:
        logging.error(f"RSI calculation error: {e}")
        return pair, {"error": "Failed to compute RSI", "details": str(e)}

    prompt = f"""
    o3 Pro: Calculate Black-Scholes-Merton params for {pair}
    o4-mini-high: Scan for RSI divergence in last 50 closes: {rsi[-50:]}
    GPT-4.5: Analyze fear/greed index from 200 tweets
    {user_prompt}
    Output JSON with:
    - Probability density function for 1h price
    - Recommended option strike prices
    """

    if images:
        prompt += "\nAttached image base64 (filenames + summary):\n"
        for img in images:
            prompt += f"Filename: {img['filename']}\nData (truncated): {img['data'][:100]}...\n"

    try:
        response = retry_with_backoff(client.chat.completions.create,
            model="o3-pro",
            messages=[{"role": "user", "content": prompt}],
            temperature=0
        )
        parsed = parse_signal(response.choices[0].message.content)
        output_file = f"{pair.replace('/', '-')}_analysis.json"
        with open(output_file, "w") as f:
            json.dump(parsed, f, indent=2)
        logging.info(f"Model output saved to {output_file}")
        return pair, parsed
    except Exception as e:
        logging.error(f"OpenAI API error: {e}")
        return pair, {"error": "Failed to get response from OpenAI", "details": str(e)}


def check_api_key_valid():
    try:
        client.models.list()
        print("✅ OpenAI API key is valid and active.")
    except Exception as e:
        print("❌ OpenAI API key is invalid or unauthorized.")
        logging.error(f"API Key validation failed: {e}")
        exit(1)


def select_exchange():
    print("Select an exchange:")
    for i, name in enumerate(EXCHANGES.keys(), 1):
        print(f"{i}. {name}")
    choice = input("Enter choice (1-4): ").strip()
    exchange_names = list(EXCHANGES.keys())
    if choice.isdigit() and 1 <= int(choice) <= len(exchange_names):
        selected = exchange_names[int(choice) - 1]
        print(f"\nUsing exchange: {selected}\n")
        return EXCHANGES[selected]
    else:
        print("Invalid selection. Exiting.")
        exit(1)


def main():
    check_api_key_valid()
    exchange = select_exchange()

    pairs_input = input("Enter trading pairs (comma-separated, e.g., BTC/USDT,ETH/USDT): ")
    pairs = [p.strip().upper() for p in pairs_input.split(',') if p.strip()]
    user_prompt = input("Enter your custom prompt: ")
    add_images = input("Do you want to add pictures? (yes/no): ").strip().lower()

    images = encode_images_from_dir(IMAGE_DIR, limit=10) if add_images in ["yes", "y"] else []

    success_count = 0
    failure_count = 0

    print("\n⏳ Processing all pairs in parallel...\n")
    with ThreadPoolExecutor(max_workers=4) as executor:
        futures = [executor.submit(generate_signal, exchange, pair, user_prompt, images) for pair in pairs]
        for future in as_completed(futures):
            pair, result = future.result()
            print(f"\nResult for {pair}:")
            print(json.dumps(result, indent=2))
            if 'error' in result:
                failure_count += 1
            else:
                success_count += 1

    print(f"\n✅ Batch processing complete: {success_count} succeeded, {failure_count} failed.")


if __name__ == "__main__":
    main()