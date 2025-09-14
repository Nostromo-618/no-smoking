# GitHub Pages Deployment Guide

This guide explains how to deploy the "I Don't Smoke" Vue.js app to GitHub Pages.

## Setup

The app is configured for GitHub Pages deployment with:
- Vite configuration for proper base path (`/no-smoking/`)
- GitHub Actions workflow for automatic deployment
- Build scripts in package.json

## Deployment Methods

### Method 1: Automatic Deployment (Recommended)

The app will automatically deploy to GitHub Pages when you push to the `gh-pages` branch:

```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages
```

The GitHub Actions workflow will:
1. Build the Vue.js app
2. Deploy to GitHub Pages
3. Make it available at: `https://yourusername.github.io/no-smoking/`

### Method 2: Manual Deployment

You can also deploy manually using the npm script:

```bash
npm run deploy
```

This will:
1. Build the app (`npm run build`)
2. Deploy the `dist` folder to the `gh-pages` branch using `gh-pages` package

## GitHub Pages Settings

Make sure to configure GitHub Pages in your repository settings:
1. Go to Settings → Pages
2. Source: "Deploy from a branch"
3. Branch: `gh-pages`
4. Folder: `/ (root)`

## Local Development

To run the app locally:

```bash
npm install
npm run dev
```

To test the production build locally:

```bash
npm run build
npm run preview
```

## Features

The deployed app includes:
- Urge intensity tracking with visual slider
- Progress charts with Chart.js
- Data export/import functionality
- Dark/light theme toggle
- Responsive design for mobile and desktop
- Local storage for data persistence

## Troubleshooting

If the app doesn't load properly on GitHub Pages:
1. Check that the base path is correct in `vite.config.ts`
2. Ensure GitHub Pages is enabled in repository settings
3. Check the GitHub Actions workflow logs for build errors
4. Verify all assets are loading with the correct base path
