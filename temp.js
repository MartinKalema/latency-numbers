        console.log('Script started - checking if JavaScript is running');
        
        const latencyData2025 = [
            { name: 'L1 Cache Reference', ns: 1, source: 'Average from Google SRE, ByteByteGo, SamWho (0.5-1 ns)', category: 'cache' },
            { name: 'Branch Mispredict', ns: 5, source: 'Thundergolfer (5 ns), Google SRE (3 ns)', category: 'cpu' },
            { name: 'L2 Cache Reference', ns: 7, source: 'Thundergolfer (7 ns), ByteByteGo (10 ns)', category: 'cache' },
            { name: 'Mutex Lock/Unlock', ns: 25, source: 'Thundergolfer (25 ns), Google SRE (17 ns)', category: 'cpu' },
            { name: 'Main Memory Reference', ns: 100, source: 'Napkin Math (50 ns), others (100 ns)', category: 'memory' },
            { name: 'System Call', ns: 500, source: 'Napkin Math (500 ns), Thundergolfer (105 ns)', category: 'system' },
            { name: 'Compress 1KB with Zippy', ns: 3000, source: 'Thundergolfer/Google SRE (2-3 μs)', category: 'cpu' },
            { name: 'Context Switch', ns: 10000, source: 'Napkin Math (10 μs), Thundergolfer (4 μs)', category: 'system' },
            { name: 'Send 2KB over 10Gbps Network', ns: 1600, source: 'Google SRE (1.6 μs), Thundergolfer (20 μs for 1Gbps)', category: 'network' },
            { name: 'SSD Random Read (4-8KB)', ns: 100000, source: 'ByteByteGo (100 μs), SamWho (150 μs)', category: 'storage' },
            { name: 'Read 1MB from Memory', ns: 250000, source: 'Thundergolfer (250 μs), Google SRE (10 μs)', category: 'memory' },
            { name: 'Datacenter Round Trip', ns: 500000, source: 'Google SRE/SamWho (0.5 ms)', category: 'network' },
            { name: 'Read 1MB from SSD', ns: 1000000, source: 'Thundergolfer/Google SRE (1 ms)', category: 'storage' },
            { name: 'HDD Disk Seek', ns: 10000000, source: 'Thundergolfer/Google SRE (10 ms)', category: 'storage' },
            { name: 'Read 1MB from HDD', ns: 20000000, source: 'Thundergolfer (20 ms)', category: 'storage' },
            { name: 'WAN Round Trip (CA-EU)', ns: 150000000, source: 'Thundergolfer/SamWho (150 ms)', category: 'network' }
        ];

        function formatNs(ns) {
            if (ns >= 1e9) return (ns / 1e9).toFixed(2) + ' s';
            if (ns >= 1e6) return (ns / 1e6).toFixed(2) + ' ms';
            if (ns >= 1e3) return (ns / 1e3).toFixed(2) + ' μs';
            return ns.toFixed(0) + ' ns';
        }

        function getBarColor(ns) {
            if (ns >= 1e6) return '#ed8936'; // ms - orange
            if (ns >= 1e3) return '#ed64a6'; // μs - pink  
            return '#764ba2'; // ns - purple
        }

        function getScaledWidth(ns, mode) {
            const maxNs = Math.max(...latencyData2025.map(d => d.ns));
            const minNs = Math.min(...latencyData2025.map(d => d.ns));
            
            switch(mode) {
                case 'log':
                    // Logarithmic scale for better visibility across orders of magnitude
                    if (ns === 0) return 0;
                    const logMin = Math.log10(minNs);
                    const logMax = Math.log10(maxNs);
                    const logValue = Math.log10(ns);
                    return Math.max(2, ((logValue - logMin) / (logMax - logMin)) * 100);
                    
                case 'relative':
                    // Show relative to L1 cache on a log scale
                    const relative = ns / latencyData2025[0].ns;
                    if (relative === 1) return 5; // L1 cache gets minimal width
                    const logRelative = Math.log10(relative);
                    const maxLogRelative = Math.log10(maxNs / latencyData2025[0].ns);
                    return Math.max(5, (logRelative / maxLogRelative) * 100);
                    
                default: // linear
                    // Linear scale - make small values visible with minimum width
                    const percentage = (ns / maxNs) * 100;
                    return Math.max(0.5, percentage); // Minimum 0.5% width so smallest values are visible
            }
        }

        function humanizeComparison(ns) {
            const l1 = latencyData2025[0].ns;
            const ratio = ns / l1;
            
            if (ratio === 1) return "baseline";
            if (ratio < 100) return `${ratio.toFixed(0)}x slower`;
            if (ratio < 1000) return `${ratio.toFixed(0)}x slower`;
            if (ratio < 1000000) return `${(ratio/1000).toFixed(1)}K times slower`;
            if (ratio < 1000000000) return `${(ratio/1000000).toFixed(1)}M times slower`;
            return `${(ratio/1000000000).toFixed(1)}B times slower`;
        }

        let metricsRendered = false;

        function updateScaleDescription(mode) {
            const desc = document.getElementById('scale-description');
            switch(mode) {
                case 'log':
                    desc.textContent = '(Better visibility across orders of magnitude)';
                    break;
                case 'relative':
                    desc.textContent = '(Everything compared to L1 cache speed)';
                    break;
                default:
                    desc.textContent = '(Actual proportional differences)';
            }
        }

        function renderMetrics() {
            const container = document.getElementById('metrics-container');
            const scaleMode = document.getElementById('scale-select').value;
            
            updateScaleDescription(scaleMode);
            
            // If metrics already exist, just update the bars
            if (metricsRendered) {
                const bars = container.querySelectorAll('.bar');
                console.log(`Updating ${bars.length} bars to ${scaleMode} scale`);
                latencyData2025.forEach((data, index) => {
                    if (bars[index]) {
                        const newWidth = getScaledWidth(data.ns, scaleMode);
                        bars[index].style.width = newWidth + '%';
                        console.log(`${data.name}: ${newWidth.toFixed(2)}%`);
                    }
                });
                return;
            }

            // First render - create all elements
            container.innerHTML = '';
            metricsRendered = true;
            console.log('Initial render - creating metrics');

            latencyData2025.forEach((data, index) => {
                console.log(`Creating metric: ${data.name} - ${formatNs(data.ns)}`);
                
                const metricDiv = document.createElement('div');
                metricDiv.className = 'metric';
                
                const nameDiv = document.createElement('div');
                nameDiv.innerHTML = `
                    <div class="metric-name">${data.name}</div>
                    <div class="source">${data.source}</div>
                `;
                
                const valueDiv = document.createElement('div');
                valueDiv.className = 'metric-value';
                valueDiv.textContent = formatNs(data.ns);
                
                const barContainer = document.createElement('div');
                barContainer.className = 'bar-container';
                
                const bar = document.createElement('div');
                bar.className = 'bar';
                const barColor = getBarColor(data.ns);
                bar.style.backgroundColor = barColor;
                bar.style.width = '0%';
                bar.setAttribute('data-index', index);
                console.log(`Bar created with color: ${barColor}`);
                
                setTimeout(() => {
                    const width = getScaledWidth(data.ns, scaleMode);
                    bar.style.width = width + '%';
                    console.log(`Bar ${index} animated to ${width}%`);
                }, index * 50);
                
                barContainer.appendChild(bar);
                
                metricDiv.appendChild(nameDiv);
                metricDiv.appendChild(valueDiv);
                metricDiv.appendChild(barContainer);
                
                metricDiv.addEventListener('click', () => {
                    showComparison(data);
                });
                
                metricDiv.addEventListener('mouseenter', (e) => {
                    const tooltip = document.getElementById('tooltip');
                    tooltip.textContent = `${humanizeComparison(data.ns)} than L1 cache`;
                    tooltip.classList.add('show');
                });
                
                metricDiv.addEventListener('mousemove', (e) => {
                    const tooltip = document.getElementById('tooltip');
                    tooltip.style.left = e.pageX + 10 + 'px';
                    tooltip.style.top = e.pageY - 30 + 'px';
                });
                
                metricDiv.addEventListener('mouseleave', () => {
                    const tooltip = document.getElementById('tooltip');
                    tooltip.classList.remove('show');
                });
                
                container.appendChild(metricDiv);
            });
        }

        function showComparison(selected) {
            const comparisons = latencyData2025.map(data => ({
                name: data.name,
                ratio: selected.ns / data.ns,
                faster: selected.ns > data.ns
            })).filter(c => c.ratio !== 1);
            
            let message = `${selected.name} (${formatNs(selected.ns)}) compared to:\n\n`;
            
            comparisons.forEach(comp => {
                if (comp.faster) {
                    message += `• ${comp.ratio.toFixed(1)}x slower than ${comp.name}\n`;
                } else {
                    message += `• ${(1/comp.ratio).toFixed(1)}x faster than ${comp.name}\n`;
                }
            });
            
            console.log(message);
        }

        document.getElementById('scale-select').addEventListener('change', () => {
            console.log('Scale changed to:', document.getElementById('scale-select').value);
            renderMetrics();
        });
        
        console.log('Page loaded, calling initial renderMetrics');
        renderMetrics();
