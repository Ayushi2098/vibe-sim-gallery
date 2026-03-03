import React, { useState } from 'react';
import { Mafs, Polygon } from 'mafs';
import { Latex } from '../Latex';
import 'mafs/core.css';

export const MixedNumbersShapes: React.FC = () => {
    const [target, setTarget] = useState({ whole: 1, num: 1, den: 2 });
    const [selection, setSelection] = useState({ whole: 0, num: 0, den: 2 });
    const [feedback, setFeedback] = useState<string | null>(null);

    const generateNew = () => {
        const den = [2, 3, 4, 5, 6][Math.floor(Math.random() * 5)];
        const num = Math.floor(Math.random() * (den - 1)) + 1;
        const whole = Math.floor(Math.random() * 3) + 1;
        setTarget({ whole, num, den });
        setSelection({ whole: 0, num: 0, den });
        setFeedback(null);
    };

    const checkAnswer = () => {
        if (selection.whole === target.whole && selection.num === target.num && selection.den === target.den) {
            setFeedback('correct');
        } else {
            setFeedback('incorrect');
        }
    };

    return (
        <div style={{ padding: '4px', color: '#f8fafc' }}>
            <div style={{ marginBottom: '10px', background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <div style={{ fontSize: '1.5em', background: 'rgba(255,255,255,0.05)', padding: '10px 20px', borderRadius: '8px', border: '1px solid #832EC5' }}>
                        Target: <span style={{ color: '#832EC5', fontWeight: 'bold' }}>
                            <Latex>{`${target.whole} \\frac{${target.num}}{${target.den}}`}</Latex>
                        </span>
                    </div>

                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button onClick={checkAnswer} style={{ padding: '8px 20px', background: '#832EC5', border: 'none', borderRadius: '4px', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>Check</button>
                        <button onClick={generateNew} style={{ padding: '8px 20px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '4px', color: 'white', cursor: 'pointer' }}>New</button>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '20px', marginBottom: '10px' }}>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9em', color: '#94a3b8' }}>Wholes: {selection.whole}</label>
                        <input type="range" min="0" max="4" value={selection.whole} onChange={e => setSelection({ ...selection, whole: Number(e.target.value) })} style={{ width: '100%', accentColor: '#832EC5' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9em', color: '#94a3b8' }}>Fraction Part: {selection.num}/{selection.den}</label>
                        <input type="range" min="0" max={selection.den - 1} value={selection.num} onChange={e => setSelection({ ...selection, num: Number(e.target.value) })} style={{ width: '100%', accentColor: '#AB5DDC' }} />
                    </div>
                </div>

                {feedback && (
                    <div style={{ textAlign: 'center', color: '#832EC5', fontWeight: 'bold', marginTop: '10px', opacity: feedback === 'correct' ? 1 : 0.5 }}>
                        {feedback === 'correct' ? 'Excellent! That exactly matches the target.' : 'Not quite. Check your whole shapes and fractional parts again.'}
                    </div>
                )}
            </div>

            <div style={{ height: '800px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', background: '#0a0a0a', overflow: 'hidden' }}>
                <Mafs viewBox={{ x: [-1, 10], y: [-3, 3] }} preserveAspectRatio={false}>
                    {/* Wholes */}
                    {Array.from({ length: selection.whole }).map((_, i) => (
                        <Polygon
                            key={`whole-${i}`}
                            points={[
                                [i * 2, -1],
                                [i * 2 + 1.5, -1],
                                [i * 2 + 1.5, 1],
                                [i * 2, 1]
                            ]}
                            color="#832EC5"
                            fillOpacity={0.6}
                            weight={2}
                        />
                    ))}

                    {/* Fractional Part */}
                    {selection.num > 0 && Array.from({ length: selection.den }).map((_, i) => (
                        <Polygon
                            key={`part-${i}`}
                            points={[
                                [selection.whole * 2 + (i * 1.5) / selection.den, -1],
                                [selection.whole * 2 + ((i + 1) * 1.5) / selection.den, -1],
                                [selection.whole * 2 + ((i + 1) * 1.5) / selection.den, 1],
                                [selection.whole * 2 + (i * 1.5) / selection.den, 1]
                            ]}
                            color={i < selection.num ? "#AB5DDC" : "rgba(255,255,255,0.05)"}
                            fillOpacity={i < selection.num ? 0.6 : 0.05}
                            weight={1}
                        />
                    ))}
                </Mafs>
            </div>
        </div>
    );
};
