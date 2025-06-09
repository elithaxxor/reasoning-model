# Trader99

An advanced batch trading signal generator and analytics toolkit using AI and quantitative analysis.

## Features

- **Multiple exchange support**: Binance, Coinbase, Kraken, BTCC, etc.
- **Technical analysis (TA)**: Fetches OHLCV, computes RSI, etc.
- **Multi-model AI analysis**: Uses multiple OpenAI models for:
  - Black-Scholes-Merton option metrics
  - Macro/volatility analysis
  - Sentiment from Twitter
  - TA with divergence checks
- **Batch processing**: Run analysis for many pairs in parallel with thread pools.
- **Image support**: Optionally attach images (charts/screenshots) as base64 to prompts.
- **Detailed logging**: Saves logs and per-pair JSON results.
- **HTML reporting**: Generates summary HTML reports for each batch.
- **Rich CLI**: Uses [rich](https://github.com/Textualize/rich) for colorful progress, tables, and summaries.

## Scripts

- `trader_01.py`, `trader_02.py`, `trader_03.py` — Variants of the main workflow, each with improvements (see comments in code for differences).
- `requirements.txt` — Required Python dependencies.
- `setup_and_run.sh` — Example setup/run script.
- `*.json`, `*.log`, `*.html` — Output results and logs.

## Usage

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
2. Set your OpenAI API key and any exchange API keys in a `.env` file.
3. Run a script:
   ```bash
   python trader_03.py
   ```
   - Select exchange and enter trading pairs as prompted.
   - Optionally attach images for richer prompts.
   - Results and batch summary will be saved and displayed.

## Output

- Structured JSON for each pair: `<PAIR>_analysis.json`
- Batch summary: `batch_summary.json`
- HTML report: `report_<timestamp>.html`
- Log file: `model_output.log`

## Notes

- Requires OpenAI API access and external Python packages.
- For real trading, review and validate all outputs carefully.
- Each script version demonstrates different approaches to prompt construction, parallelism, and output handling.

---

## License

MIT (or as per root repository)
