# Latency Numbers Every Programmer Should Know (2025 Update)

An interactive visualization of computer latency at different scales, updated for 2025 hardware. This project provides an intuitive understanding of the relative speed of various computer operations.

## Live Demo

Visit the live site: [https://yourusername.github.io/latency-numbers-2025](https://yourusername.github.io/latency-numbers-2025)

## Features

- **Interactive Visualization**: Hover over metrics to see relative comparisons
- **Multiple Scale Views**: 
  - Linear scale for absolute comparisons
  - Logarithmic scale for better visibility across orders of magnitude
  - Relative scale comparing everything to L1 cache speed
- **Modern Design**: Clean, responsive interface with smooth animations
- **Data Sources**: Compiled from trusted sources including Google SRE, ByteByteGo, Thundergolfer, and Napkin Math

## Latency Overview

The visualization includes key latency metrics from nanoseconds to seconds:

- **Cache Operations** (1-7 ns): L1 and L2 cache references
- **Memory Operations** (100-250,000 ns): RAM access and sequential reads
- **Storage Operations** (100 μs - 20 ms): SSD and HDD operations
- **Network Operations** (1.6 μs - 150 ms): Datacenter and WAN round trips

## Deployment

This project automatically deploys to GitHub Pages when you push to the main branch.

### Setup Instructions

1. **Create a GitHub Repository**
   ```bash
   # Create a new repository on GitHub named "latency-numbers-2025"
   # Then add the remote:
   git remote add origin https://github.com/yourusername/latency-numbers-2025.git
   ```

2. **Update package.json**
   - Replace `yourusername` in the repository URL with your GitHub username

3. **Enable GitHub Pages**
   - Go to Settings → Pages in your GitHub repository
   - Under "Build and deployment", select "GitHub Actions" as the source

4. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit: Latency numbers visualization"
   git branch -M main
   git push -u origin main
   ```

5. **Wait for Deployment**
   - The GitHub Actions workflow will automatically deploy your site
   - Check the Actions tab in your repository to monitor the deployment
   - Your site will be available at `https://yourusername.github.io/latency-numbers-2025`

## Local Development

To run the project locally:

```bash
# Using Python (included in package.json)
npm run serve

# Or directly with Python
python3 -m http.server 8000

# Or with any other static server
npx serve .
```

Then open http://localhost:8000 in your browser.

## Data Sources

The latency numbers are compiled from multiple authoritative sources:

- [Google SRE Book](https://sre.google/sre-book/)
- [ByteByteGo System Design](https://bytebytego.com/)
- [Thundergolfer's Napkin Math](https://github.com/thundergolfer/napkin-math)
- [SamWho.dev](https://samwho.dev/)

## Technology Stack

- **D3.js v7**: For data visualization
- **Pure JavaScript**: No framework dependencies
- **GitHub Actions**: Automated deployment to GitHub Pages
- **Responsive CSS**: Mobile-friendly design with CSS Grid and Flexbox

## Credits

Inspired by Colin Scott's original latency calculator and Jeff Dean's "Numbers Everyone Should Know" talk.

## License

MIT License - feel free to use this visualization in your own projects!