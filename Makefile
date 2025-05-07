## TrendMonitor System Makefile

.PHONY: all setup env status run-trend run-trend-async run-prompt run-content run-performance run-pipeline run-pipeline-async test clean data-dirs help

# Default target shows status
all: status

# Setup the environment
setup:
	@echo "Setting up TrendMonitor environment..."
	@python main.py setup
	@pip install -r requirements.txt

# Create example .env file
env:
	@python main.py setup --create-env

# Show system status
status:
	@python main.py status

# Run individual components
run-trend:
	@python main.py run trend-monitor

run-trend-async:
	@python main.py run trend-monitor --async

run-prompt:
	@python main.py run prompt-engine

run-content:
	@python main.py run content-generator

run-performance:
	@python main.py run performance-logger

# Run the full pipeline
run-pipeline:
	@python main.py run full-pipeline

run-pipeline-async:
	@python main.py run full-pipeline --async

# Run tests
test:
	@echo "Running tests..."
	@pytest -v

# Clean up generated files
clean:
	@echo "Cleaning up generated files..."
	@rm -f daily_trends*.json
	@rm -f content_prompts_*.json
	@rm -f scene_manifests_*.json
	@rm -f performance_feedback.json
	@rm -f *.log

# Create data and template directories
data-dirs:
	@mkdir -p data logs .cache
	@mkdir -p Templates/fitness Templates/finance Templates/entrepreneurship Templates/mens_health Templates/health Templates/luxury_lifestyle

# Help message
help:
	@echo "TrendMonitor System Makefile"
	@echo "Available targets:"
	@echo "  setup            - Set up environment and install dependencies"
	@echo "  env              - Create example .env file"
	@echo "  status           - Show system status"
	@echo "  run-trend        - Run TrendMonitor component"
	@echo "  run-trend-async  - Run TrendMonitor async"
	@echo "  run-prompt       - Run PromptEngine component"
	@echo "  run-content      - Run ContentGenerator component"
	@echo "  run-performance  - Run PerformanceLogger component"
	@echo "  run-pipeline     - Run the full pipeline"
	@echo "  run-pipeline-async - Run the full pipeline with async"
	@echo "  test             - Run tests"
	@echo "  clean            - Clean up generated files"
	@echo "  data-dirs        - Create data and template directories"
	@echo "  help             - Show this help message"