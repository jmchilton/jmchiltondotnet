.PHONY: help dev build preview clean install format format-check lint typecheck test all cv

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
	@echo "  make cv            - Build CV and Resume PDFs (requires pdflatex)"
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
	rm -rf dist .astro node_modules/.astro cv/build public/resume.pdf public/cv.pdf

# Build CV and Resume PDFs
cv:
	@echo "Building CV and Resume PDFs..."
	cd cv && mkdir -p build/resume build/cv
	cd cv && sed 's/IS_RESUME/true/' source.tex > build/resume/source.tex
	cd cv && cp res.cls build/resume/
	cd cv/build/resume && pdflatex source.tex && pdflatex source.tex
	cd cv && sed 's/IS_RESUME/false/' source.tex > build/cv/source.tex
	cd cv && cp res.cls build/cv/
	cd cv/build/cv && pdflatex source.tex && pdflatex source.tex
	cp cv/build/resume/source.pdf public/resume.pdf
	cp cv/build/cv/source.pdf public/cv.pdf
	@echo "PDFs built and copied to public/"

# Run everything
all: format lint typecheck build
	@echo "Build complete!"
