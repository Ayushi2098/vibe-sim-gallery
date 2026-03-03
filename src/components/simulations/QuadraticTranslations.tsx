import React, { useState } from 'react';
import { Mafs, Coordinates, Plot, LaTeX } from 'mafs';
import { Latex } from '../Latex';

import 'mafs/core.css';

export const QuadraticTranslations: React.FC = () => {
    const [h, setH] = useState(0);
    const [k, setK] = useState(0);

    return (
        <div style={{ padding: '4px', color: '#f8fafc' }}>
            <div style={{ marginBottom: '10px', background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
                <div style={{ flex: '1', marginRight: '20px' }}>

                    <div style={{ fontSize: '1.2em', fontFamily: 'monospace' }}>
                        <Latex>{`y = (x ${h >= 0 ? '-' : '+'} ${Math.abs(h)})^2 ${k >= 0 ? '+' : '-'} ${Math.abs(k)}`}</Latex>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.9em', marginBottom: '2px' }}>Horizontal (h): {h}</label>
                        <input
                            type="range"
                            min="-5"
                            max="5"
                            step="1"
                            value={h}
                            onChange={(e) => setH(parseInt(e.target.value))}
                            style={{ width: '100px' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.9em', marginBottom: '2px' }}>Vertical (k): {k}</label>
                        <input
                            type="range"
                            min="-5"
                            max="5"
                            step="1"
                            value={k}
                            onChange={(e) => setK(parseInt(e.target.value))}
                            style={{ width: '100px' }}
                        />
                    </div>
                </div>
            </div>

            <div style={{ height: '800px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', overflow: 'hidden', background: '#0f172a' }}>
                <Mafs
                    height={800}
                    viewBox={{ x: [-10, 10], y: [-10, 10] }}
                    preserveAspectRatio={false}
                >
                    <Coordinates.Cartesian />

                    {/* Base Graph (Dashed) */}
                    <Plot.OfX
                        y={(x) => x * x}
                        style="dashed"
                        color="#94a3b8"
                        opacity={0.5}
                    />

                    {/* Transformed Graph */}
                    <Plot.OfX
                        y={(x) => Math.pow(x - h, 2) + k}
                        color="#AB5DDC"
                        weight={3}
                    />

                    {/* Vertex Label */}
                    <LaTeX at={[h, k - 0.5]} tex={`V(${h}, ${k})`} color="#AB5DDC" />

                </Mafs>
            </div>
        </div>
    );
};
