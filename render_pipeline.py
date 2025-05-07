import os

class RenderPipeline:
    def __init__(self, root_dir):
        self.root_dir = root_dir
        # Other initializations...

    # Rest of the code remains the same...

if __name__ == "__main__":
    ROOT_DIR = r"C:\Users\Administrator\Smart4_Tech"  # Updated path
    pipeline = RenderPipeline(ROOT_DIR)
    pipeline.render_videos()