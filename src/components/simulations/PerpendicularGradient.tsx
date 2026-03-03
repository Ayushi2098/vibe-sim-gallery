import React, { useState } from 'react';
import { Mafs, Coordinates, Plot, LaTeX } from 'mafs';
import { Latex } from '../Latex';

import 'mafs/core.css';

export const PerpendicularGradient: React.FC = () => {
    // Similar to PerpendicularLines but focusing on the numerical relationship
    const [m1, setM1] = useState(2);

    const mPerpendicular = -1 / m1;

    return (
        <div style={{ padding: '4px', color: '#f8fafc' }}>
            <div style={{ marginBottom: '10px', background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '8px' }}>

                <div style={{ fontSize: '1.1em', fontFamily: 'monospace', marginBottom: '15px' }}>
                    If Line 1 has gradient <span style={{ color: '#832EC5' }}><Latex>{`m_1 = ${m1}`}</Latex></span>
                    <br />
                    Then Perpendicular Line has gradient <span style={{ color: '#AB5DDC' }}><Latex>{`m_2 = -\\frac{1}{m_1} = ${mPerpendicular.toFixed(2)}`}</Latex></span>
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Gradient m: {m1}</label>
                    <input
                        type="range"
                        min="-5"
                        max="5"
                        step="0.5"
                        value={m1}
                        onChange={(e) => {
                            const val = parseFloat(e.target.value);
                            setM1(val === 0 ? 0.1 : val); // Avoid 0
                        }}
                        style={{ width: '100%' }}
                    />
                </div>

            </div>

            <div style={{ height: '800px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', overflow: 'hidden' }}>
                <Mafs>
                    <Coordinates.Cartesian />

                    {/* Line 1 */}
                    <Plot.OfX y={(x) => m1 * x} color="#832EC5" />
                    <LaTeX at={[2, m1 * 2 + 0.8]} tex={`m_1 = ${m1}`} color="#832EC5" />

                    {/* Perpendicular Line */}
                    <Plot.OfX y={(x) => mPerpendicular * x} color="#AB5DDC" />
                    <LaTeX at={[2, mPerpendicular * 2 - 0.8]} tex={`m_2 = ${mPerpendicular.toFixed(2)}`} color="#AB5DDC" />

                </Mafs>
            </div>
        </div>
    );
};
