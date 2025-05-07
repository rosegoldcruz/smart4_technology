import json
import os

class ContentGenerator:
    def __init__(self, root_dir):
        self.root_dir = root_dir
        self.assets_dir = os.path.join(root_dir, "Assets")
        # Other initializations...

    def _get_default_templates(self, content_type):
        """Get default templates if no template file exists"""
        # Existing templates...
        
        # Added templates for technology and AI
        if content_type == "Technology":
            return {
                "templates": [
                    {
                        "hook_format": "This {trend} tech is about to change everything",
                        "intro_format": "While everyone's focused elsewhere, {trend} is quietly revolutionizing tech.",
                        "content_points": [
                            {"format": "First, {trend} is 10x more efficient than current solutions"},
                            {"format": "Second, major companies are investing billions in {trend}"},
                            {"format": "Finally, early adopters of {trend} are seeing incredible results"}
                        ],
                        "outro_format": "Don't miss the {trend} revolution.",
                        "hashtags": ["#TechTok", "#FutureTech", "#Innovation"],
                        "visual_cues": ["Tech device", "Circuit boards", "Digital interfaces"]
                    }
                ]
            }
        elif content_type == "AI":
            return {
                "templates": [
                    {
                        "hook_format": "AI experts are stunned by this {trend} breakthrough",
                        "intro_format": "{trend} is changing what we thought was possible with AI.",
                        "content_points": [
                            {"format": "First, {trend} is outperforming human experts by 43%"},
                            {"format": "Second, this AI approach uses surprisingly simple {trend} techniques"},
                            {"format": "Finally, here's how you can leverage {trend} right now"}
                        ],
                        "outro_format": "The {trend} era is just beginning.",
                        "hashtags": ["#AITok", "#MachineLearning", "#FutureTech"],
                        "visual_cues": ["Neural networks", "Data visualization", "AI interfaces"]
                    }
                ]
            }
        
        # Default templates fallback remains the same...

    # Rest of the code remains the same...

if __name__ == "__main__":
    ROOT_DIR = r"C:\Users\Administrator\Smart4_Tech"  # Updated path
    generator = ContentGenerator(ROOT_DIR)
    generator.generate_scripts()