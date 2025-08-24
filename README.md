# Latency Numbers Every Programmer Should Know (2025 Update)

An interactive visualization of computer latency at different scales, updated for 2025 hardware. This project provides an intuitive understanding of the relative speed of various computer operations.

## Live Demo

Visit the live site: [https://martinkalema.github.io/latency-numbers](https://martinkalema.github.io/latency-numbers)

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