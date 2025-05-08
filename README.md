 # TrendMonitor System
 A comprehensive system for monitoring, analyzing, and generating content based on trending topics across multiple platforms.

 ## Features
 - **Multi-source Trend Monitoring**: Scrape and analyze trends from TikTok, Reddit, Google Trends, Twitter/X, and more
 - **Vertical-specific Content Generation**: Generate content prompts optimized for fitness, finance, entrepreneurship, men’s health, health, and luxury lifestyle niches
 - **AI-ready Video Scene Planning**: Create detailed scene manifests for AI video generation platforms
 - **Performance Tracking**: Log and analyze content performance metrics to optimize future content
 - **Async Processing**: Improved performance with async/await and multiprocessing

 ## Getting Started

 ### Prerequisites
 - Python 3.8+
 - API keys for Reddit, TikTok, etc.
 - Chrome/Chromium (for Selenium-based scraping)

 ### Installation
 1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/trendmonitor.git
    cd trendmonitor
    ```
 2. Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
 3. Create and configure your `.env` file:
    ```bash
    make env
    # Edit the .env file with your API keys
    ```
 4. Set up the environment:
    ```bash
    make setup
    ```

 ## Usage

 Run the system as a complete pipeline or individual components.

 ### Full pipeline
 ```bash
 make run-pipeline
 ```

 ### Individual components
 ```bash
 make run-trend
 make run-prompt
 make run-content
 make run-performance
 ```

 ### Async version
 ```bash
 make run-trend-async
 make run-pipeline-async
 ```

 ### Status
 ```bash
 make status
 ```

 ## Testing

 Run the test suite:
 ```bash
 make test
 ```

 ## Project Structure

 ```text
 trendmonitor/
 ├── main.py
 ├── trend_monitor.py
 ├── prompt_engine.py
 ├── content_generator.py
 ├── performance_logger.py
 ├── trend_monitor_async.py
 ├── new_data_sources.py
 ├── test_trend_monitor.py
 ├── runner.py
 ├── Makefile
 ├── requirements.txt
 ├── .env.example
 ├── data/
 ├── Templates/
└── logs/
 ```
## Vadoo AI Webhook Setup

In the Vadoo AI dashboard, locate the "Webhook" field (just below the Referral box) and paste your webhook endpoint URL. For example:

```text
https://yourserver.com/vadoo/webhook
```

As soon as you paste the URL, it is auto-saved — there is no "Save" button.

This webhook will receive POST requests from Vadoo AI containing video generation data once each render is complete.

### Flask Example
If you don't have a webhook endpoint yet, you can use this basic Python Flask example:

```python
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/vadoo/webhook', methods=['POST'])
def vadoo_webhook():
    data = request.json
    print("Vadoo Video Info Received:", data)
    # Optionally save to file or database
    return jsonify({"status": "received"}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002)
```

Deploy this on any cloud VM, or use a tool like ngrok to expose your local development server:

```bash
ngrok http 5002
```

Now set the generated ngrok URL (e.g., https://abcd1234.ngrok.io/vadoo/webhook) in the Vadoo AI Webhook field.
