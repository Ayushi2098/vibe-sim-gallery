import React, { useState } from 'react';
import { Mafs, Coordinates, Plot, LaTeX } from 'mafs';
import { Latex } from '../Latex';

import 'mafs/core.css';

export const ParallelCoincidentLines: React.FC = () => {
    // Line 1 (Static-ish)
    const m1 = 1;
    const b1 = 2;

    // Line 2 (User controlled)
    const [m2, setM2] = useState(1);
    const [b2, setB2] = useState(-1);

    const isParallel = Math.abs(m1 - m2) < 0.01 && Math.abs(b1 - b2) > 0.01;
    const isCoincident = Math.abs(m1 - m2) < 0.01 && Math.abs(b1 - b2) < 0.01;

    return (
        <div style={{ padding: '4px', color: '#f8fafc' }}>
            <div style={{ marginBottom: '10px', background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '8px' }}>

                <div style={{ fontSize: '1.1em', fontFamily: 'monospace', marginBottom: '15px' }}>
                    <span style={{ color: '#832EC5' }}>Line 1: <Latex>{`y = ${m1} x + ${b1} `}</Latex></span>
                    <br />
                    <span style={{ color: '#AB5DDC' }}>Line 2: <Latex>{`y = ${m2}x ${b2 >= 0 ? '+' : ''} ${b2} `}</Latex></span>
                </div>

                <div style={{ marginBottom: '15px', fontWeight: 'bold' }}>
                    Status: <span style={{
                        color: isCoincident ? '#832EC5' : isParallel ? '#AB5DDC' : 'rgba(255,255,255,0.7)'
                    }}>
                        {isCoincident ? 'COINCIDENT (Same Line)' : isParallel ? 'PARALLEL (Never Intersect)' : 'INTERSECTING'}
                    </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Line 2 Slope (m): {m2}</label>
                        <input
                            type="range"
                            min="-2"
                            max="4"
                            step="0.1"
                            value={m2}
                            onChange={(e) => setM2(parseFloat(e.target.value))}
                            style={{ width: '100%' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Line 2 Intercept (c): {b2}</label>
                        <input
                            type="range"
                            min="-2"
                            max="4"
                            step="0.5"
                            value={b2}
                            onChange={(e) => setB2(parseFloat(e.target.value))}
                            style={{ width: '100%' }}
                        />
                    </div>
                </div>

            </div>

            <div style={{ height: '800px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', overflow: 'hidden' }}>
                <Mafs>
                    <Coordinates.Cartesian />

                    {/* Line 1 */}
                    <Plot.OfX y={(x) => m1 * x + b1} color="#832EC5" weight={3} />
                    <LaTeX at={[-4, m1 * -4 + b1 + 0.5]} tex="\text{Line 1}" color="#832EC5" />

                    {/* Line 2 */}
                    <Plot.OfX y={(x) => m2 * x + b2} color="#AB5DDC" weight={3} style={isCoincident ? "dashed" : "solid"} />
                    <LaTeX at={[4, m2 * 4 + b2 + 0.5]} tex="\text{Line 2}" color="#AB5DDC" />

                </Mafs>
            </div>
        </div>
    );
};
