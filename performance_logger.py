import json
import os
import logging
from datetime import datetime
from typing import Dict, Any
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("performance_logger.log"),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger("performance_logger")

# Constants
SUPPORTED_VERTICALS = [
    "fitness", 
    "finance", 
    "entrepreneurship", 
    "mens_health", 
    "health", 
    "luxury_lifestyle"
]

class PerformanceLogger:
    def __init__(self, feedback_file: str = "performance_feedback.json"):
        self.feedback_file = feedback_file
        self.performance_data = self._load_performance_data()

    def _load_performance_data(self) -> Dict:
        """Load existing performance data from JSON file"""
        try:
            with open(self.feedback_file, "r") as f:
                return json.load(f)
        except (FileNotFoundError, json.JSONDecodeError):
            logger.info("No existing performance data found, creating new dataset")
            return self._initialize_performance_data()
        
    def _initialize_performance_data(self) -> Dict:
        """Initialize empty performance data structure"""
        data = {
            "videos": [],
            "aggregate_metrics": {},
            "vertical_performance": {}
        }
        for vertical in SUPPORTED_VERTICALS:
            data["vertical_performance"][vertical] = {
                "videos": [],
                "metrics": {
                    "avg_engagement_rate": 0,
                    "avg_completion_rate": 0,
                    "avg_viral_coefficient": 0
                },
                "top_performing_hooks": {},
                "top_performing_ctas": {},
                "top_performing_tones": {}
            }
        return data
        
    def log_video_performance(self, performance_data: Dict) -> bool:
        """Log performance metrics for a video"""
        try:
            required = ["video_id","views","likes","shares","comments","watch_time_sec"]
            for field in required:
                if field not in performance_data:
                    logger.error(f"Missing required field: {field}")
                    return False
            video_id = performance_data["video_id"]
            views = performance_data["views"]
            likes = performance_data["likes"]
            shares = performance_data["shares"]
            comments = performance_data["comments"]
            watch_time_sec = performance_data["watch_time_sec"]
            vertical = performance_data.get("vertical", self._extract_vertical_from_id(video_id))
            hook_type = performance_data.get("hook_type", "unknown")
            cta_type = performance_data.get("cta_type", "unknown")
            tone = performance_data.get("tone", "unknown")
            engagement_rate = self._calculate_engagement_rate(views, likes, comments, shares)
            completion_rate = self._calculate_completion_rate(watch_time_sec)
            viral_coefficient = self._calculate_viral_coefficient(views, shares)
            timestamp = datetime.now().isoformat()
            entry = {
                "video_id": video_id,
                "timestamp": timestamp,
                "raw_metrics": {"views":views,"likes":likes,"shares":shares,"comments":comments,"watch_time_sec":watch_time_sec},
                "derived_metrics": {"engagement_rate":engagement_rate,"completion_rate":completion_rate,"viral_coefficient":viral_coefficient},
                "metadata": {"vertical":vertical,"hook_type":hook_type,"cta_type":cta_type,"tone":tone}
            }
            self.performance_data["videos"].append(entry)
            if vertical in self.performance_data["vertical_performance"]:
                self.performance_data["vertical_performance"][vertical]["videos"].append(entry)
            self._update_aggregate_metrics()
            self._update_pattern_recognition(entry)
            self._save_performance_data()
            logger.info(f"Logged performance for video {video_id}")
            return True
        except Exception as e:
            logger.error(f"Error logging video performance: {e}")
            return False
        
    def _extract_vertical_from_id(self, video_id: str) -> str:
        for vertical in SUPPORTED_VERTICALS:
            if vertical.lower() in video_id.lower():
                return vertical
        return "general"
    
    def _calculate_engagement_rate(self, views, likes, comments, shares) -> float:
        if views == 0: return 0
        return round(((likes+comments+shares)/views)*100,2)
    
    def _calculate_completion_rate(self, watch_time_sec: float) -> float:
        standard = 30.0
        return min(round((watch_time_sec/standard)*100,2),100)
    
    def _calculate_viral_coefficient(self, views: int, shares: int) -> float:
        if views==0: return 0
        return round(shares/views,4)
    
    def _update_aggregate_metrics(self):
        videos = self.performance_data["videos"]
        if not videos: return
        total_eng = sum(v["derived_metrics"]["engagement_rate"] for v in videos)
        total_comp = sum(v["derived_metrics"]["completion_rate"] for v in videos)
        total_viral = sum(v["derived_metrics"]["viral_coefficient"] for v in videos)
        count = len(videos)
        self.performance_data["aggregate_metrics"] = {
            "avg_engagement_rate": round(total_eng/count,2),
            "avg_completion_rate": round(total_comp/count,2),
            "avg_viral_coefficient": round(total_viral/count,4),
            "total_videos": count,
            "last_updated": datetime.now().isoformat()
        }
        for vertical in SUPPORTED_VERTICALS:
            v_videos = self.performance_data["vertical_performance"][vertical]["videos"]
            if not v_videos: continue
            v_total_eng = sum(v["derived_metrics"]["engagement_rate"] for v in v_videos)
            v_total_comp = sum(v["derived_metrics"]["completion_rate"] for v in v_videos)
            v_total_viral = sum(v["derived_metrics"]["viral_coefficient"] for v in v_videos)
            v_count = len(v_videos)
            self.performance_data["vertical_performance"][vertical]["metrics"] = {
                "avg_engagement_rate": round(v_total_eng/v_count,2),
                "avg_completion_rate": round(v_total_comp/v_count,2),
                "avg_viral_coefficient": round(v_total_viral/v_count,4),
                "total_videos": v_count
            }
    
    def _update_pattern_recognition(self, entry: Dict[str, Any]):
        vertical = entry["metadata"]["vertical"]
        if vertical not in self.performance_data["vertical_performance"]: return
        for field in ["hook_type","cta_type","tone"]:
            pattern = entry["metadata"][field]
            if pattern and pattern != "unknown":
                key = {
                    "hook_type": "top_performing_hooks",
                    "cta_type": "top_performing_ctas",
                    "tone": "top_performing_tones"
                }[field]
                self._update_pattern_scores(
                    self.performance_data["vertical_performance"][vertical][key],
                    pattern,
                    entry["derived_metrics"]["engagement_rate"],
                    entry["derived_metrics"]["viral_coefficient"]
                )
    
    def _update_pattern_scores(self, pattern_dict, pattern, eng, viral):
        norm_eng = min(eng/100,1)
        norm_viral = min(viral*10,1)
        combined = norm_eng*0.6 + norm_viral*0.4
        if pattern in pattern_dict:
            alpha = 0.3
            pattern_dict[pattern] = alpha*combined + (1-alpha)*pattern_dict[pattern]
        else:
            pattern_dict[pattern] = combined
    
    def _save_performance_data(self) -> bool:
        try:
            with open(self.feedback_file, "w") as f:
                json.dump(self.performance_data,f,indent=2)
            logger.info(f"Saved performance data to {self.feedback_file}")
            return True
        except Exception as e:
            logger.error(f"Failed to save performance data: {e}")
            return False
    
    def analyze_and_generate_feedback(self) -> Dict:
        if not self.performance_data["videos"]:
            logger.warning("No performance data available for analysis")
            return {}
        feedback = {"summary":{},"vertical_insights":{},"content_recommendations":{}}
        summary = feedback["summary"]
        vids = self.performance_data["videos"]
        summary["total_videos"] = len(vids)
        summary["overall_engagement"] = self.performance_data["aggregate_metrics"]["avg_engagement_rate"]
        summary["overall_completion"] = self.performance_data["aggregate_metrics"]["avg_completion_rate"]
        summary["overall_virality"] = self.performance_data["aggregate_metrics"]["avg_viral_coefficient"]
        # top_verticals omitted for brevity
        return feedback

def main():
    logger_obj = PerformanceLogger()
    # Example logging omitted for brevity
    analysis = logger_obj.analyze_and_generate_feedback()
    print("Performance analysis complete.")

if __name__ == "__main__":
    main()