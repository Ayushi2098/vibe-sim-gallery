import React, { useState } from 'react';
import { Mafs, Coordinates, Plot, useMovablePoint, LaTeX } from 'mafs';
import { Latex } from '../Latex';
import 'mafs/core.css';

export const QuadraticTurningPoint: React.FC = () => {
    const [a, setA] = useState(1);
    const [b, setB] = useState(-4);
    const [c, setC] = useState(3);

    // Calculated vertex
    const h = -b / (2 * a);
    const k = a * h * h + b * h + c;

    // User movable point to guess the vertex
    const userPoint = useMovablePoint([0, 0], {
        color: '#AB5DDC',
        constrain: ([x, y]) => [Math.max(-10, Math.min(10, x)), Math.max(-10, Math.min(10, y))]
    });

    const isCorrect = Math.abs(userPoint.x - h) < 0.2 && Math.abs(userPoint.y - k) < 0.2;

    return (
        <div style={{ padding: '4px', color: '#f8fafc' }}>
            <div style={{ marginBottom: '10px', background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
                <div style={{ flex: '1', marginRight: '20px' }}>
                    <div style={{ fontSize: '1.2em', fontFamily: 'monospace', marginTop: '5px' }}>
                        <Latex>{`y = ${a === 1 ? '' : a === -1 ? '-' : a}x^2 ${b >= 0 ? '+' : '-'} ${Math.abs(b)}x ${c >= 0 ? '+' : '-'} ${Math.abs(c)}`}</Latex>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.8em', marginBottom: '1px' }}>a: {a}</label>
                        <input
                            type="range"
                            min="-3"
                            max="3"
                            step="0.5"
                            value={a}
                            onChange={(e) => {
                                const val = parseFloat(e.target.value);
                                setA(val === 0 ? 0.5 : val);
                            }}
                            style={{ width: '80px' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.8em', marginBottom: '1px' }}>b: {b}</label>
                        <input
                            type="range"
                            min="-10"
                            max="10"
                            step="1"
                            value={b}
                            onChange={(e) => setB(parseInt(e.target.value))}
                            style={{ width: '80px' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.8em', marginBottom: '1px' }}>c: {c}</label>
                        <input
                            type="range"
                            min="-10"
                            max="10"
                            step="1"
                            value={c}
                            onChange={(e) => setC(parseInt(e.target.value))}
                            style={{ width: '80px' }}
                        />
                    </div>
                </div>
            </div>

            <div style={{ height: '800px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', overflow: 'hidden', background: '#0f172a', position: 'relative' }}>
                <Mafs
                    height={800}
                    viewBox={{ x: [-10, 10], y: [-10, 10] }}
                    preserveAspectRatio={false}
                >
                    <Coordinates.Cartesian />

                    {/* The Actual Graph */}
                    <Plot.OfX
                        y={(x) => a * x * x + b * x + c}
                        color="#94a3b8"
                        weight={2}
                        opacity={0.6}
                    />

                    {/* User Point */}
                    {userPoint.element}

                    {/* Reveal vertex text when correct */}
                    {isCorrect && (
                        <LaTeX at={[h, k - 0.5]} tex={`Vertex (${h.toFixed(1)}, ${k.toFixed(1)})`} color="#832EC5" />
                    )}

                </Mafs>

                <div style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    padding: '8px 16px',
                    background: isCorrect ? 'rgba(34, 197, 94, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                    color: isCorrect ? 'white' : '#475569',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                    {isCorrect ? "Correct Location!" : "Find the Turning Point"}
                </div>
            </div>
        </div>
    );
};
