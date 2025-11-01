# Auto GitHub Pages Deployment

This project includes an automated deployment system that builds your Vue.js app and deploys it to the `gh-pages` branch for GitHub Pages hosting.

## 🚀 Automated Deploy

**Step 1:** Build the project
```bash
npm run build
```

**Step 2:** Deploy to GitHub Pages
```bash
npm run deploy:pages
```

The deployment script will:
1. **Switch** to gh-pages branch
2. **Clean** the gh-pages branch (keeping only built files)
3. **Deploy** the dist folder contents to gh-pages root
4. **Add** `.nojekyll` file to prevent Jekyll processing
5. **Commit & Push** to GitHub
6. **Switch back** to main branch

## 🎯 All-in-One (Alternative)

If you prefer a single command:
```bash
npm run build && npm run deploy:pages
```

## 📁 Project Structure

- **main branch**: Source code (Vue.js + TypeScript + Vite)
- **gh-pages branch**: Built files only (HTML, CSS, JS, assets)
- **dist folder**: Temporary build output

## 🌐 Live Site

Your site is available at: https://nostromo-618.github.io/no-smoking/

---

# No Smoking - Urge Tracking App

A Vue.js application to help people track their smoking urges and monitor their progress toward quitting smoking. This app provides a simple, privacy-focused way to log urge intensity, outcomes, and visualize progress over time.

## Features

- **Urge Tracking**: Record smoking urges with intensity levels (1-10 scale)
- **Outcome Tracking**: Track whether urges were resisted, resulted in smoking, or just recorded
- **Data Visualization**: Interactive charts showing progress over time with date range filtering
- **Theme Support**: Light, dark, and system theme switching
- **Data Management**: Export and import your tracking data as JSON
- **Privacy-First**: All data stored locally in your browser
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Tech Stack

- **Vue 3** with Composition API and TypeScript
- **Vuetify 3** for UI components and theming
- **Chart.js** with vue-chartjs for data visualization
- **Vue Router** for navigation
- **Vite** as build tool

## Project Setup

```sh
npm install
```

### Development

```sh
npm run dev
```

### Build for Production

```sh
npm run build
```

### Preview Production Build

```sh
npm run preview
```

### Code Quality

```sh
# Lint and fix issues
npm run lint

# Format code
npm run format

# Type checking
npm run type-check
```

### Deployment

```sh
# Deploy to GitHub Pages
npm run deploy
```

## Usage

1. **Accept Disclaimer**: First-time users must accept the medical disclaimer
2. **Track Urges**: Use the slider to set intensity (1-10) and select outcome type
3. **View Progress**: Check the chart to see your progress over time
4. **Filter Data**: Use date range filters to focus on specific periods
5. **Export Data**: Download your data as JSON for backup or analysis
6. **Import Data**: Restore previously exported data

## Data Privacy

- All data is stored locally in your browser's localStorage
- No data is sent to external servers
- You can export your data at any time
- Data persists between browser sessions

## Disclaimer

This app is for informational purposes only and is not a substitute for professional medical advice. Always consult with healthcare providers for smoking cessation support.

## License

This project is open source. Please check the license file for details.

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.