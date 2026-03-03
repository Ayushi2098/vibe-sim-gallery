import React, { useState } from 'react';
import { Mafs, Coordinates, Plot, LaTeX } from 'mafs';
import { Latex } from '../Latex';
import 'mafs/core.css';

export const CosineGraph: React.FC = () => {
    const [amplitude, setAmplitude] = useState(1);
    const [b, setB] = useState(1);
    const [verticalShift, setVerticalShift] = useState(0);

    return (
        <div style={{ padding: '4px' }}>
            <div style={{ marginBottom: '10px', background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '8px' }}>
                <div style={{ fontSize: '1.1em', fontFamily: 'monospace', marginBottom: '15px' }}>
                    <Latex>{`y = ${amplitude !== 1 ? amplitude : ''}\\cos(${b !== 1 ? b : ''}x) ${verticalShift !== 0 ? (verticalShift > 0 ? '+' : '') + verticalShift : ''}`}</Latex>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div>
                        <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Amplitude: {amplitude}</div>
                        <input
                            type="range"
                            min="0.5"
                            max="3"
                            step="0.5"
                            value={amplitude}
                            onChange={(e) => setAmplitude(parseFloat(e.target.value))}
                            style={{ width: '100%', accentColor: '#832EC5' }}
                        />
                    </div>
                    <div>
                        <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Vertical Shift: {verticalShift}</div>
                        <input
                            type="range"
                            min="-2"
                            max="2"
                            step="0.5"
                            value={verticalShift}
                            onChange={(e) => setVerticalShift(parseFloat(e.target.value))}
                            style={{ width: '100%', accentColor: '#832EC5' }}
                        />
                    </div>
                </div>
                <div style={{ marginTop: '10px' }}>
                    <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Frequency (B): {b}</div>
                    <input
                        type="range"
                        min="0.5"
                        max="3"
                        step="0.5"
                        value={b}
                        onChange={(e) => setB(parseFloat(e.target.value))}
                        style={{ width: '100%', accentColor: '#832EC5' }}
                    />
                    <div style={{ fontSize: '0.9em', color: '#94a3b8', marginTop: '5px' }}>
                        Period = <Latex>{`\\frac{2\\pi}{|B|} = ${b === 1 ? '2\\pi' : (2 / b).toFixed(1) + '\\pi'}`}</Latex>
                    </div>
                </div>
            </div>

            <div style={{ height: '800px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', overflow: 'hidden', background: '#0a0a0a' }}>
                <Mafs viewBox={{ x: [-7, 7], y: [-4, 4] }}>
                    <Coordinates.Cartesian
                        subdivisions={2}
                        xAxis={{
                            lines: Math.PI / 2,
                            labels: (x) => {
                                if (x === 0) return "0";
                                const piMult = x / Math.PI;
                                let label = "";
                                if (Math.abs(piMult % 1) < 0.01) {
                                    label = x < 0 ? `-${Math.abs(piMult)}\\pi` : `${piMult}\\pi`;
                                    if (Math.abs(piMult) === 1) label = x < 0 ? `-\\pi` : `\\pi`;
                                } else if (Math.abs(piMult % 0.5) < 0.01) {
                                    label = x < 0 ? `-\\frac{${Math.abs(piMult * 2)}}{2}\\pi` : `\\frac{${piMult * 2}}{2}\\pi`;
                                }

                                return label ? <Latex>{label}</Latex> : "";
                            }
                        }}
                    />

                    <Plot.OfX
                        y={(x) => amplitude * Math.cos(b * x) + verticalShift}
                        color="#832EC5"
                        weight={3}
                    />

                    <LaTeX at={[0, amplitude + verticalShift + 0.4]} tex="\text{Max}" color="#832EC5" />

                    {b === 1 && (
                        <LaTeX at={[2 * Math.PI, verticalShift + amplitude + 0.4]} tex="2\pi" color="#832EC5" />
                    )}
                </Mafs>
            </div>
        </div>
    );
};
