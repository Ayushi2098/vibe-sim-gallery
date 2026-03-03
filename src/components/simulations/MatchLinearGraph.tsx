import React, { useState } from 'react';
import { Mafs, Coordinates, Plot } from 'mafs';
import { Latex } from '../Latex';

import 'mafs/core.css';

export const MatchLinearGraph: React.FC = () => {
    // Target Line parameters
    const [targetM] = useState(() => Math.floor(Math.random() * 5) - 2 || 1);
    const [targetB] = useState(() => Math.floor(Math.random() * 6) - 3);

    // User controls
    const [userM, setUserM] = useState(1);
    const [userB, setUserB] = useState(0);

    const isMatch = Math.abs(userM - targetM) < 0.1 && Math.abs(userB - targetB) < 0.1;

    return (
        <div style={{ padding: '4px', color: '#f8fafc' }}>
            <div style={{ marginBottom: '10px', background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '8px' }}>


                <div style={{ marginBottom: '15px' }}>
                    <div style={{ color: '#AB5DDC', fontWeight: 'bold' }}>Target Graph: Blue Line</div>
                    <div style={{ color: '#832EC5' }}>Your Equation: <Latex>{`y = ${userM}x ${userB >= 0 ? '+' : ''} ${userB}`}</Latex></div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Gradient (m): {userM}</label>
                        <input
                            type="range"
                            min="-5"
                            max="5"
                            step="0.5"
                            value={userM}
                            onChange={(e) => setUserM(parseFloat(e.target.value))}
                            style={{ width: '100%' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Y-intercept (c): {userB}</label>
                        <input
                            type="range"
                            min="-5"
                            max="5"
                            step="1"
                            value={userB}
                            onChange={(e) => setUserB(parseFloat(e.target.value))}
                            style={{ width: '100%' }}
                        />
                    </div>
                </div>

                {isMatch && (
                    <div style={{ marginTop: '10px', color: '#832EC5', fontWeight: 'bold' }}>
                        <Latex>{"\\text{Correct! You matched the graph.}"}</Latex>
                    </div>
                )}
            </div>

            <div style={{ height: '800px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', overflow: 'hidden' }}>
                <Mafs>
                    <Coordinates.Cartesian />

                    {/* Target Line */}
                    <Plot.OfX y={(x) => targetM * x + targetB} color="#AB5DDC" weight={3} opacity={0.6} />

                    {/* User Line */}
                    <Plot.OfX y={(x) => userM * x + userB} color="#832EC5" weight={3} />
                </Mafs>
            </div>
        </div>
    );
};
