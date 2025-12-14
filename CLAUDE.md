# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based clock application that displays a random cat image from The Cat API alongside the current time and date. The project is built with Vite and TypeScript, and is deployed via GitHub Pages.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Preview production build
npm run preview
```

## Build Configuration

- **Build tool**: Vite with React plugin
- **Output directory**: `docs/` (for GitHub Pages)
- **Base path**: `/cat-clock/` (configured in vite.config.ts)
- **TypeScript**: Strict mode enabled with bundler module resolution

## Architecture

### Core Components

- **src/App.tsx**: Main application component
  - Implements a real-time clock using `setInterval` with 1-second updates
  - Displays a cat image from The Cat API (line 32)
  - Shows formatted time and date using `toLocaleTimeString` and `toLocaleDateString`
  - All state managed via React hooks (`useState`, `useEffect`)

- **src/main.tsx**: Application entry point using React 18+ `createRoot` API

### GitHub Actions Automation

The `.github/workflows/build.yml` workflow runs hourly and on manual dispatch:
1. Fetches a random cat image URL from The Cat API
2. Updates the image URL in `src/App.tsx` line 32 using `sed`
3. Rebuilds the application
4. Commits and pushes changes if the image changed

**Important**: When modifying `App.tsx`, be aware that line 32 contains the cat image URL that is automatically updated by CI. The sed command specifically targets this line number, so maintain the structure around the `<img src="...">` element.

## Code Style

- Uses ESLint with TypeScript, React Hooks, and React Refresh plugins
- Flat config format (eslint.config.js)
- Ignores `dist/` directory
- React components use functional components with hooks (no class components)
