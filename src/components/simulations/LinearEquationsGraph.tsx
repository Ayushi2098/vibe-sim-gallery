import React, { useState } from 'react';
import { Mafs, Coordinates, Plot, LaTeX } from 'mafs';
import { Latex } from '../Latex';
import 'mafs/core.css';

export const LinearEquationsGraph: React.FC = () => {
    const [m, setM] = useState(2);
    const [b, setB] = useState(1);

    // Create a draggable point on the line to visualize
    const sampleX = 1;
    const sampleY = m * sampleX + b;

    return (
        <div style={{ padding: '4px' }}>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '8px', marginBottom: '15px', display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center' }}>
                <div style={{ flex: '1', minWidth: '200px' }}>
                    <div style={{ fontSize: '1.4em', fontFamily: 'monospace', marginBottom: '10px', color: '#832EC5' }}>
                        <Latex>{`y = ${m}x ${b >= 0 ? '+' : ''} ${b}`}</Latex>
                    </div>
                    <div style={{ fontSize: '0.85em', color: '#94a3b8' }}>
                        <div>When x = 0: y = {b} (y-intercept)</div>
                        <div>When x = 1: y = {m + b}</div>
                        <div>Slope = rise/run = {m}</div>
                    </div>
                </div>

                <div style={{ flex: '1', minWidth: '250px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <label style={{ minWidth: '90px', fontSize: '0.9em' }}>Slope (m): {m}</label>
                        <input type="range" min="-5" max="5" step="0.5" value={m} onChange={(e) => setM(parseFloat(e.target.value))} style={{ flex: 1, accentColor: '#832EC5' }} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <label style={{ minWidth: '90px', fontSize: '0.9em' }}>Y-int (b): {b}</label>
                        <input type="range" min="-5" max="5" step="0.5" value={b} onChange={(e) => setB(parseFloat(e.target.value))} style={{ flex: 1, accentColor: '#832EC5' }} />
                    </div>
                </div>
            </div>

            <div style={{ height: '800px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', overflow: 'hidden', background: '#0a0a0a' }}>
                <Mafs height={800}>
                    <Coordinates.Cartesian />
                    <Plot.OfX y={(x) => m * x + b} color="#832EC5" />
                    <circle cx={0} cy={b} r={0.12} fill="#FFE999" />
                    <LaTeX at={[0.3, b]} tex={`(0, ${b})`} color="#FFE999" />
                    <circle cx={sampleX} cy={sampleY} r={0.08} fill="#832EC5" />
                    <LaTeX at={[sampleX + 0.3, sampleY]} tex={`(${sampleX}, ${sampleY.toFixed(1)})`} color="#832EC5" />
                </Mafs>
            </div>
        </div>
    );
};
