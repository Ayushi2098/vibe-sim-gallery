import React, { useState } from 'react';
import { Coordinates, Point, LaTeX, useMovablePoint, Plot, Polygon } from 'mafs';
import { Latex } from '../Latex';
import { SimulationContainer } from './SimulationContainer';

export const GeometricSequence: React.FC = () => {
    const [ratio, setRatio] = useState(2);

    // Draggable start point at n=0
    const startPoint = useMovablePoint([0, 2], {
        constrain: ([, y]) => [0, Math.max(1, Math.round(y))],
        color: '#832EC5'
    });

    const start = startPoint.y;
    // Show 6 terms as they grow quickly
    const terms = Array.from({ length: 6 }, (_, n) => ({ n, val: start * Math.pow(ratio, n) }));

    return (
        <SimulationContainer
            title="Geometric Sequence"
            tooltip="Drag the purple point up and down to change the start value. Use the slider to adjust the common ratio."
            subtitle={
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '30px',
                    marginTop: '10px',
                    padding: '12px',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.05)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '0.9em', color: '#94a3b8' }}>Common Ratio (r):</span>
                        <input
                            type="range"
                            min="0.5"
                            max="3"
                            step="0.5"
                            value={ratio}
                            onChange={e => setRatio(Number(e.target.value))}
                            style={{ width: '150px', accentColor: '#832EC5', cursor: 'pointer' }}
                        />
                        <span style={{ minWidth: '20px', fontWeight: 'bold' }}>{ratio}</span>
                    </div>

                    <div style={{ display: 'flex', gap: '15px' }}>
                        <div style={{
                            background: 'rgba(168, 85, 247, 0.1)',
                            padding: '4px 12px',
                            borderRadius: '6px',
                            border: '1px solid rgba(168, 85, 247, 0.2)',
                            color: '#e9d5ff',
                            fontSize: '0.95em'
                        }}>
                            <Latex>{`a_n = ${start} \\cdot ${ratio}^{n-1}`}</Latex>
                        </div>
                    </div>
                </div>
            }
            viewBox={{ x: [-1, 6], y: [-15, 115] }}
            preserveAspectRatio={false}
        >
            <Coordinates.Cartesian
                xAxis={{
                    labels: (n) => n >= 0 ? n.toString() : "",
                    lines: 1
                }}
                yAxis={{
                    labels: (n) => (n % 20 === 0 && n >= 0) ? n.toString() : "",
                    lines: 20
                }}
            />

            {/* Visualizing the multiplication factor with exponential arcs */}
            {terms.slice(0, -1).map((t, i) => {
                const next = terms[i + 1];
                const m = (t.n + next.n) / 2;
                const w = (next.n - t.n) / 2;
                const h = Math.abs(next.val - t.val) / 2 + 30;
                const base = (t.val + next.val) / 2;
                const midX = i + 0.5;

                // dy/dx = -2h(x-m)/w^2
                const getAngle = (x: number) => Math.atan2(-2 * h * (x - m) / (w * w), 1);

                const marginStart = 0.1;
                const marginEnd = 0;
                const startX = t.n + marginStart;
                const endX = next.n - marginEnd;

                const endY = base + h * (1 - Math.pow((endX - m) / w, 2));

                const angleEnd = getAngle(endX);

                return (
                    <React.Fragment key={`hop-${i}`}>
                        <Plot.OfX
                            y={(x) => base + h * (1 - Math.pow((x - m) / w, 2))}
                            domain={[startX, endX]}
                            color="#AB5DDC"
                            opacity={0.4}
                        />

                        {/* End Arrowhead - Tip at endX */}
                        <Polygon
                            points={[
                                [endX, endY],
                                [
                                    endX - 0.12 * Math.cos(angleEnd) - 0.05 * Math.sin(angleEnd),
                                    endY - (0.12 * Math.sin(angleEnd) - 0.05 * Math.cos(angleEnd)) * 0.05
                                ],
                                [
                                    endX - 0.12 * Math.cos(angleEnd) + 0.05 * Math.sin(angleEnd),
                                    endY - (0.12 * Math.sin(angleEnd) + 0.05 * Math.cos(angleEnd)) * 0.05
                                ]
                            ]}
                            color="#AB5DDC"
                            fillOpacity={1}
                            weight={0}
                        />

                        <LaTeX
                            at={[midX, base + h + 2]}
                            tex={`\\times ${ratio}`}
                            color="#AB5DDC"
                        />
                    </React.Fragment>
                );
            })}

            {/* Sequence Points */}
            {terms.map((t) => (
                <React.Fragment key={t.n}>
                    <Point x={t.n} y={t.val} color={t.n === 0 ? "#832EC5" : "#AB5DDC"} />
                    {t.val < 100 && (
                        <LaTeX
                            at={[t.n, t.val - 8]}
                            tex={Math.round(t.val * 100) / 100 === t.val ? t.val.toString() : t.val.toFixed(1)}
                            color={t.n === 0 ? "#832EC5" : "#AB5DDC"}
                        />
                    )}
                </React.Fragment>
            ))}

            {/* Draggable start handle */}
            {startPoint.element}
        </SimulationContainer>
    );
};
