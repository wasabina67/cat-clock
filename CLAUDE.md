# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server**: `npm run dev`
- **Build**: `npm run build` (runs TypeScript compiler then Vite build, outputs to `docs/`)
- **Lint**: `npm run lint`
- **Preview production build**: `npm run preview`

## Architecture

This is a React + TypeScript + Vite application that displays a clock with a cat image background.

### Key Files

- `src/App.tsx` - Main component with clock logic and cat image fetching
- `vite.config.ts` - Configured with base path `/cat-clock/` and outputs to `docs/` for GitHub Pages
- `public/metadata.json` - Contains the current cat image URL, updated by GitHub Actions

### How It Works

The app fetches cat images from The Cat API. A GitHub Actions workflow (`.github/workflows/build.yml`) runs on a schedule (weekdays 00:00-09:00 UTC) to:
1. Fetch a random cat image URL from The Cat API
2. Write it to `public/metadata.json`
3. Build and commit the changes

The frontend polls `metadata.json` every 10 minutes to check for new images.
