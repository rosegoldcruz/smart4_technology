import json
import os
import requests
from datetime import datetime
import pandas as pd
from bs4 import BeautifulSoup

class TrendMonitor:
    def __init__(self, root_dir):
        self.root_dir = root_dir
        self.trends_file = os.path.join(root_dir, "RenderQueue", "daily_trends.json")
        self.niches = ["fitness", "fashion", "entrepreneurship", "finance",
                       "dating", "sports", "sportsbetting", "mma",
                       "technology", "ai"]  # Added technology and AI

    # Rest of the code remains the same...

if __name__ == "__main__":
    ROOT_DIR = r"C:\Users\Administrator\Smart4_Tech"  # Updated path
    monitor = TrendMonitor(ROOT_DIR)
    monitor.run_trend_analysis()