.PHONY: help dev build preview clean install format format-check lint typecheck test all

# Default target
help:
	@echo "Available commands:"
	@echo "  make install       - Install dependencies"
	@echo "  make dev           - Start development server"
	@echo "  make build         - Build for production"
	@echo "  make preview       - Preview production build"
	@echo "  make format        - Format code with Prettier"
	@echo "  make format-check  - Check code formatting"
	@echo "  make lint          - Lint code with ESLint"
	@echo "  make typecheck     - Type check with TypeScript"
	@echo "  make test          - Run all checks (format, lint, typecheck)"
	@echo "  make clean         - Clean build artifacts"
	@echo "  make all           - Run format, lint, typecheck, and build"

# Install dependencies
install:
	npm install

# Development server
dev:
	npm run dev

# Production build
build:
	npm run build

# Preview production build
preview:
	npm run preview

# Format code
format:
	npm run format

# Check code formatting
format-check:
	npm run format:check

# Lint code
lint:
	npm run lint

# Type check
typecheck:
	npm run typecheck

# Run all checks
test: format-check lint typecheck
	@echo "All checks passed!"

# Clean build artifacts
clean:
	rm -rf dist .astro node_modules/.astro

# Run everything
all: format lint typecheck build
	@echo "Build complete!"
