import React, { useEffect, useRef, useState } from 'react';
import type { Simulation } from '@/lib/types';
import { generateSimulation } from '@/lib/api';
import { LoadingSpinner } from './LoadingSpinner';
import { Latex } from './Latex';
import './SimulationViewer.css';

interface SimulationViewerProps {
    simulation: Simulation;
    onClose: () => void;
    standalone?: boolean;
}

import { getSimulationComponent } from './simulations/registry'; // Keep existing
import { InfoTooltip } from './InfoTooltip';
import { EmbedModal } from './EmbedModal';

export const SimulationViewer: React.FC<SimulationViewerProps> = ({ simulation, onClose, standalone }) => {
    const [embedOpen, setEmbedOpen] = useState(false);
    // Check if we have a native component for this simulation
    const NativeComponent = getSimulationComponent(simulation.id);

    const [loading, setLoading] = useState(!NativeComponent); // Don't load if native
    const [error, setError] = useState<string | null>(null);
    const [generatedCode, setGeneratedCode] = useState<string | null>(null);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        document.body.classList.add('no-scroll');

        const cleanup = () => {
            document.body.classList.remove('no-scroll');
        };

        if (NativeComponent) {
            return cleanup;
        }

        let mounted = true;
        const loadSimulation = async () => {
            if (simulation.url.includes('localhost:3003')) {
                setLoading(false);
                setError(null);
                setGeneratedCode(null);
                return;
            }

            try {
                setLoading(true);
                setError(null);
                setGeneratedCode(null);

                console.log('Generating simulation for:', simulation.url);
                const result = await generateSimulation(simulation.url);

                if (!mounted) return;

                if (result.success && result.result.code) {
                    setGeneratedCode(result.result.code);
                } else {
                    setError(result.error || 'Failed to generate simulation');
                }
            } catch (err) {
                if (!mounted) return;
                setError(err instanceof Error ? err.message : 'Unknown error occurred');
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        };
        loadSimulation();
        return () => {
            cleanup();
            mounted = false;
        };
    }, [simulation.url, NativeComponent]);

    useEffect(() => {
        if (simulation.url.includes('localhost:3003') && iframeRef.current) {
            iframeRef.current.src = simulation.url;
            return;
        }

        if (generatedCode && iframeRef.current) {
            const template = createViewerHTML(generatedCode);
            const blob = new Blob([template], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            iframeRef.current.src = url;

            return () => URL.revokeObjectURL(url);
        }
    });

    return (
        <div
            className={`simulation-viewer-overlay${standalone ? ' simulation-viewer-overlay--standalone' : ''}`}
            onClick={standalone ? undefined : onClose}
        >
            <div
                className={`simulation-viewer${standalone ? ' simulation-viewer--standalone' : ''}`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Top-right action buttons */}
                <div className="viewer-actions">
                    <button
                        className="viewer-embed-btn"
                        onClick={() => setEmbedOpen(true)}
                        aria-label="Get embed code"
                        title="Embed this simulation"
                    >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="16 18 22 12 16 6" />
                            <polyline points="8 6 2 12 8 18" />
                        </svg>
                        Embed
                    </button>
                    <button className="viewer-close" onClick={onClose} aria-label="Close">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="viewer-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                    <h2 style={{ margin: 0, lineHeight: 1.2, textAlign: 'center' }}>
                        {simulation.title.split(/(\$[^\$]+\$)/g).map((part, i) => {
                            if (part.startsWith('$') && part.endsWith('$')) {
                                return <Latex key={i}>{part.slice(1, -1)}</Latex>;
                            }
                            return <span key={i}>{part}</span>;
                        })}
                    </h2>
                    {simulation.tooltip && (
                        <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                            <InfoTooltip text={simulation.tooltip} />
                        </div>
                    )}
                </div>

                <div className="viewer-content" style={{ overflow: 'hidden' }}>
                    {/* Render Native Component if available */}
                    {NativeComponent ? (
                        <div className="native-simulation-container" style={{ overflow: 'hidden' }}>
                            <NativeComponent />
                        </div>
                    ) : (
                        <>
                            {loading && (
                                <div className="viewer-loading">
                                    <LoadingSpinner />
                                    <p>Generating interactive simulation...</p>
                                </div>
                            )}

                            {error && (
                                <div className="viewer-error">
                                    {/* ... error UI ... */}
                                    <p>{error}</p>
                                    <button onClick={onClose}>Close</button>
                                </div>
                            )}

                            {(generatedCode || simulation.url.includes('localhost:3003')) && !loading && !error && (
                                <iframe
                                    ref={iframeRef}
                                    className="simulation-iframe"
                                    title={simulation.title}
                                    sandbox="allow-scripts allow-same-origin"
                                    scrolling="no"
                                />
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Embed modal rendered inside the viewer so it stacks above the overlay */}
            {embedOpen && (
                <EmbedModal
                    simId={simulation.id}
                    simTitle={simulation.title}
                    onClose={() => setEmbedOpen(false)}
                />
            )}
        </div>
    );
};

function createViewerHTML(code: string): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MAFS Simulation</title>
    <link rel="stylesheet" href="https://esm.sh/mafs@0.19.0/core.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body {
            height: 100%;
            margin: 0;
            padding: 0;
            overflow: hidden !important;
        }
        body { 
            background: #0a0a0f; 
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            color: #fff;
            display: flex;
            flex-direction: column;
        }
        #root {
            flex: 1;
            height: 100%;
            overflow: hidden !important;
            padding: 20px;
        }
        
        .simulation-container {
            max-width: 1100px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border-radius: 16px;
            padding: 24px;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .simulation-title {
            font-size: 18px;
            margin-bottom: 8px;
            color: #f0f0f0;
        }
        
        .simulation-note {
            font-style: italic;
            color: #a0a0a0;
            margin-bottom: 12px;
            font-size: 14px;
        }
        
        .formula-display {
            font-size: 18px;
            margin: 16px 0;
            padding: 8px 0;
        }
        
        .simulation-layout {
            display: flex;
            gap: 24px;
            align-items: flex-start;
        }
        
        .info-panel {
            flex: 0 0 280px;
        }
        
        .info-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 14px;
        }
        
        .info-table td {
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 10px 12px;
            background: rgba(255, 255, 255, 0.02);
        }
        
        .info-table td:first-child {
            background: rgba(255, 255, 255, 0.05);
            font-weight: 500;
            width: 45%;
        }
        
        .graph-panel {
            flex: 1;
            min-width: 0;
        }
        
        .MafsView {
            --mafs-bg: #0f0f15;
            --mafs-fg: #e0e0e0;
            --mafs-line-color: #333;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            height: 650px;
        }
        
        .loading { color: #888; text-align: center; padding: 40px; }
        .error { 
            color: #ff6b6b; 
            padding: 20px; 
            background: rgba(255, 107, 107, 0.1); 
            border-radius: 8px; 
            font-family: monospace; 
            white-space: pre-wrap; 
        }
        
        .katex { font-size: 1.1em; }
        .dynamic-value { color: #8a63ff; font-weight: 500; }
    </style>
</head>
<body>
    <div id="root"><div class="loading">Loading...</div></div>
    
    <script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
    <script type="module">
        import React, { createElement as h, useState, useEffect, useMemo, useCallback } from 'https://esm.sh/react@18.2.0';
        import { createRoot } from 'https://esm.sh/react-dom@18.2.0/client';
        import { Mafs, Coordinates, Plot, useMovablePoint, Text, Line, Circle, vec, Theme, Point, Polygon, Transform } from 'https://esm.sh/mafs@0.19.0?deps=react@18.2.0,react-dom@18.2.0';
        
        window.React = React;
        window.h = h;
        window.useState = useState;
        window.useEffect = useEffect;
        window.useMemo = useMemo;
        window.useCallback = useCallback;
        window.Mafs = Mafs;
        window.Coordinates = Coordinates;
        window.Plot = Plot;
        window.useMovablePoint = useMovablePoint;
        window.Text = Text;
        window.Line = Line;
        window.Circle = Circle;
        window.vec = vec;
        window.Theme = Theme;
        window.Point = Point;
        window.Polygon = Polygon;
        window.Transform = Transform;
        
        window.KaTeX = (props) => {
            const ref = React.useRef(null);
            React.useEffect(() => {
                if (ref.current && props.math) {
                    try {
                        katex.render(props.math, ref.current, { 
                            throwOnError: false,
                            displayMode: props.display || false
                        });
                    } catch (e) {
                        ref.current.textContent = props.math;
                    }
                }
            }, [props.math]);
            return h('span', { ref, className: props.className || '' });
        };
        
        window.InfoTable = (props) => {
            return h('table', { className: 'info-table' },
                h('tbody', null,
                    ...(props.rows || []).map((row, i) => 
                        h('tr', { key: i },
                            h('td', null, row.label),
                            h('td', null, 
                                row.math ? h(KaTeX, { math: row.math }) : row.value
                            )
                        )
                    )
                )
            );
        };
        
        ${code}
        
        try {
            const root = createRoot(document.getElementById('root'));
            root.render(h(GeoGebraClone));
        } catch (e) {
            console.error(e);
            document.getElementById('root').innerHTML = '<div class="error">Error: ' + e.message + '\\n\\n' + e.stack + '</div>';
        }
    </script>
</body>
</html>`;
}
