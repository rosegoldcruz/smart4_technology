#!/usr/bin/env python3
"""
TrendMonitor System - Main Entry Point
This script provides a command-line interface to run the entire TrendMonitor pipeline
or individual components.
"""
import os
import sys
import logging
import argparse
import json
import time
from datetime import datetime
from typing import Dict, List, Any, Optional
from dotenv import load_dotenv

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("trendmonitor.log"),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger("main")

# Import modules with availability flags
MODULES = {}
try:
    from trend_monitor import TrendMonitor
    MODULES["trend_monitor"] = True
except ImportError:
    logger.warning("trend_monitor module not found")
    MODULES["trend_monitor"] = False
try:
    from prompt_engine import PromptEngine
    MODULES["prompt_engine"] = True
except ImportError:
    logger.warning("prompt_engine module not found")
    MODULES["prompt_engine"] = False
try:
    from content_generator import ContentGenerator
    MODULES["content_generator"] = True
except ImportError:
    logger.warning("content_generator module not found")
    MODULES["content_generator"] = False
try:
    from performance_logger import PerformanceLogger
    MODULES["performance_logger"] = True
except ImportError:
    logger.warning("performance_logger module not found")
    MODULES["performance_logger"] = False
try:
    from trend_monitor_async import AsyncTrendMonitor
    MODULES["trend_monitor_async"] = True
except ImportError:
    logger.warning("trend_monitor_async module not found")
    MODULES["trend_monitor_async"] = False

def check_environment() -> bool:
    """Check if the environment is properly set up"""
    logger.info("Checking environment...")
    if not os.path.exists(".env"):
        logger.warning("No .env file found. API keys will need to be set in environment variables.")
    load_dotenv()
    required_keys = []
    if MODULES["trend_monitor"] or MODULES["trend_monitor_async"]:
        required_keys += ["REDDIT_CLIENT_ID", "REDDIT_CLIENT_SECRET"]
    if MODULES["content_generator"]:
        required_keys += ["HAILUO_API_KEY", "INVIDEO_API_KEY"]
    missing = [k for k in required_keys if not os.getenv(k)]
    if missing:
        logger.warning(f"Missing API keys: {', '.join(missing)}")
        return False
    if not os.path.exists("data"):
        os.makedirs("data", exist_ok=True)
    if MODULES["content_generator"] and not os.path.exists("Templates"):
        verts = ["fitness","finance","entrepreneurship","mens_health","health","luxury_lifestyle"]
        for v in verts:
            os.makedirs(f"Templates/{v}", exist_ok=True)
    return True

def run_trend_monitor(use_async: bool = False) -> bool:
    logger.info(f"Running TrendMonitor {'(async)' if use_async else ''}")
    try:
        if use_async and MODULES["trend_monitor_async"]:
            import asyncio
            monitor = AsyncTrendMonitor()
            loop = asyncio.get_event_loop()
            trends = loop.run_until_complete(monitor.collect_all_trends_async())
            result = monitor.save_trends_to_json()
        elif MODULES["trend_monitor"]:
            monitor = TrendMonitor()
            trends = monitor.collect_all_trends()
            result = monitor.save_trends_to_json()
        else:
            logger.error("No trend monitor module available")
            return False
        logger.info(f"TrendMonitor completed, collected {len(trends)} trends")
        return result
    except Exception as e:
        logger.error(f"Error running TrendMonitor: {e}")
        return False

def run_prompt_engine() -> bool:
    if not MODULES["prompt_engine"]:
        logger.error("Prompt engine module not available")
        return False
    logger.info("Running Prompt Engine")
    try:
        engine = PromptEngine()
        prompts = engine.generate_prompts_batch(count_per_vertical=5)
        result = engine.save_prompts_to_json(prompts)
        logger.info(f"Prompt Engine completed, generated prompts for {len(prompts)} verticals")
        return result
    except Exception as e:
        logger.error(f"Error running Prompt Engine: {e}")
        return False

def run_content_generator() -> bool:
    if not MODULES["content_generator"]:
        logger.error("Content generator module not available")
        return False
    logger.info("Running Content Generator")
    try:
        gen = ContentGenerator()
        batch = gen.generate_content_batch(batch_size=3)
        result = gen.save_manifests_to_json(batch)
        logger.info(f"Content Generator completed, generated content for {len(batch)} verticals")
        return result
    except Exception as e:
        logger.error(f"Error running Content Generator: {e}")
        return False

def run_performance_logger() -> bool:
    if not MODULES["performance_logger"]:
        logger.error("Performance logger module not available")
        return False
    logger.info("Running Performance Logger")
    try:
        pl = PerformanceLogger()
        perf = {
            "video_id": f"Hook-MensHealth_{datetime.now().strftime('%Y%m%d')}",
            "views": 32000,
            "likes": 1500,
            "shares": 820,
            "comments": 210,
            "watch_time_sec": 24.7,
            "vertical": "mens_health",
            "hook_type": "curiosity",
            "cta_type": "try_this",
            "tone": "authoritative"
        }
        pl.log_video_performance(perf)
        pl.send_feedback_to_prompt_engine()
        logger.info("Performance Logger completed")
        return True
    except Exception as e:
        logger.error(f"Error running Performance Logger: {e}")
        return False

def run_full_pipeline(use_async: bool = False) -> bool:
    logger.info(f"Running full pipeline {'(async)' if use_async else ''}")
    if not check_environment():
        logger.warning("Environment issues detected")
    if not run_trend_monitor(use_async): return False
    time.sleep(1)
    if not run_prompt_engine(): return False
    time.sleep(1)
    if not run_content_generator(): return False
    time.sleep(1)
    if not run_performance_logger(): return False
    logger.info("Full pipeline completed successfully")
    return True

def show_status():
    print("\n=== TrendMonitor System Status ===")
    env_ok = check_environment()
    print(f"Environment: {'✅ Ready' if env_ok else '⚠️ Issues found'}")
    print("\nModules:")
    for mod, ok in MODULES.items():
        print(f"  {mod}: {'✅' if ok else '❌'}")
    print("\nData Files:")
    patterns = [
        "daily_trends.json",
        "content_prompts_*.json",
        "scene_manifests_*.json",
        "performance_feedback.json"
    ]
    import glob
    for pat in patterns:
        files = glob.glob(pat)
        if files:
            latest = max(files, key=os.path.getctime)
            ts = datetime.fromtimestamp(os.path.getctime(latest))
            print(f"  {pat}: ✅ Latest: {latest} ({ts})")
        else:
            print(f"  {pat}: ❌ Not found")
    print("\n=================================")

def create_example_env():
    fname = ".env.example" if os.path.exists(".env") else ".env"
    with open(fname, "w") as f:
        f.write("""# API Keys for TrendMonitor
REDDIT_CLIENT_ID=your_reddit_client_id
REDDIT_CLIENT_SECRET=your_reddit_client_secret
REDDIT_USER_AGENT=TrendMonitor v1.0
HAILUO_API_KEY=your_hailuo_api_key
INVIDEO_API_KEY=your_invideo_api_key
NEWS_API_KEY=your_news_api_key
SEMRUSH_API_KEY=your_semrush_api_key
INSTAGRAM_API_KEY=your_instagram_api_key
""")
    print(f"Created example environment file: {fname}")

def parse_args():
    parser = argparse.ArgumentParser(description="TrendMonitor CLI")
    subs = parser.add_subparsers(dest="command")
    run = subs.add_parser("run", help="Run components")
    run.add_argument("component", choices=["trend-monitor","prompt-engine","content-generator","performance-logger","full-pipeline"])
    run.add_argument("--async", action="store_true")
    subs.add_parser("status", help="Show status")
    setup = subs.add_parser("setup", help="Setup system")
    setup.add_argument("--create-env", action="store_true")
    return parser.parse_args()

def main():
    args = parse_args()
    if args.command == "run":
        comp = args.component
        if comp == "trend-monitor": run_trend_monitor(getattr(args, 'async', False))
        elif comp == "prompt-engine": run_prompt_engine()
        elif comp == "content-generator": run_content_generator()
        elif comp == "performance-logger": run_performance_logger()
        elif comp == "full-pipeline": run_full_pipeline(getattr(args, 'async', False))
    elif args.command == "status":
        show_status()
    elif args.command == "setup":
        if getattr(args, 'create_env', False): create_example_env()
        check_environment()
    else:
        show_status()
        print("Use 'python main.py --help' for usage.")

if __name__ == "__main__":
    main()