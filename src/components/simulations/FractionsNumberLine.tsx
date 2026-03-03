import React, { useState } from 'react';
import { Mafs, useMovablePoint, Line, Polygon, LaTeX } from 'mafs';
import { Latex } from '../Latex';

import 'mafs/core.css';

export const FractionsNumberLine: React.FC = () => {
    const [denominator, setDenominator] = useState(4);
    const point = useMovablePoint([3 / 4, 0], {
        color: '#832EC5',
        constrain: (p) => [Math.max(0, Math.min(2, p[0])), 0]
    });

    // Constrain point to fraction positions
    const nearestFraction = Math.round(point.x * denominator) / denominator;
    const numerator = Math.round(nearestFraction * denominator);

    const [targetMode, setTargetMode] = useState(false);
    const [targetValue, setTargetValue] = useState({ n: 1, d: 2 });
    const [feedback, setFeedback] = useState<'neutral' | 'correct'>('neutral');

    const generateTarget = () => {
        const d = Math.floor(Math.random() * 7) + 2; // 2-8
        const n = Math.floor(Math.random() * (2 * d - 1)) + 1; // 1 to 2d-1
        setTargetValue({ n, d });
        setDenominator(d);
        setFeedback('neutral');
    };

    const toggleTargetMode = () => {
        if (!targetMode) generateTarget();
        setTargetMode(!targetMode);
    };

    const checkAnswer = () => {
        if (numerator === targetValue.n && denominator === targetValue.d) {
            setFeedback('correct');
        }
    };

    return (
        <div style={{ padding: '4px' }}>

            <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                    onClick={toggleTargetMode}
                    style={{
                        padding: '6px 12px',
                        background: targetMode ? '#832EC5' : '#832EC5',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        fontWeight: 'bold'
                    }}
                >
                    {targetMode ? 'Exit Target Mode' : 'Target Mode'}
                </button>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
                {!targetMode ? (
                    <>
                        <div style={{ fontSize: '1.5em', marginBottom: '15px' }}>
                            Position: <span style={{ color: '#832EC5' }}><Latex>{`\\frac{${numerator}}{${denominator}}`}</Latex></span>
                            {numerator !== 0 && (
                                <span style={{ marginLeft: '20px', fontSize: '0.8em', color: '#94a3b8' }}>
                                    <Latex>{`\\approx ${(numerator / denominator).toFixed(3)}`}</Latex>
                                </span>
                            )}
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label style={{ display: 'block', marginBottom: '5px' }}>Denominator: {denominator}</label>
                            <input
                                type="range"
                                min="2"
                                max="12"
                                value={denominator}
                                onChange={(e) => setDenominator(parseInt(e.target.value))}
                                style={{ width: '100%', accentColor: '#832EC5' }}
                            />
                        </div>
                    </>
                ) : (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <div style={{ fontSize: '1.2rem', color: '#94a3b8' }}>Place the point at:</div>
                            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#832EC5' }}>
                                <Latex>{`\\frac{${targetValue.n}}{${targetValue.d}}`}</Latex>
                            </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            {feedback === 'correct' ? (
                                <div style={{ color: '#832EC5', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '10px' }}>Correct!</div>
                            ) : (
                                <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '10px' }}>
                                    Current: <Latex>{`\\frac{${numerator}}{${denominator}}`}</Latex>
                                </div>
                            )}
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button onClick={generateTarget} style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>New Target</button>
                                <button
                                    onClick={checkAnswer}
                                    style={{
                                        padding: '8px 24px',
                                        background: feedback === 'correct' ? '#832EC5' : '#AB5DDC',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    Check
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div style={{ height: '800px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', overflow: 'hidden', background: '#0a0a0a' }}>
                <Mafs viewBox={{ x: [-0.1, 2.1], y: [-0.4, 0.4] }} preserveAspectRatio={false} pan={false} zoom={false}>
                    <Line.Segment point1={[0, 0]} point2={[2, 0]} color="#94a3b8" weight={4} />

                    {Array.from({ length: 2 * denominator + 1 }, (_, i) => {
                        const x = i / denominator;
                        const isMajor = i % denominator === 0;
                        const isActive = Math.abs(x - nearestFraction) < 0.001;

                        return (
                            <React.Fragment key={i}>
                                <Line.Segment
                                    point1={[x, isMajor ? -0.15 : -0.08]}
                                    point2={[x, isMajor ? 0.15 : 0.08]}
                                    color={isActive ? '#832EC5' : (isMajor ? '#94a3b8' : 'rgba(255,255,255,0.2)')}
                                    weight={isActive ? 4 : (isMajor ? 3 : 2)}
                                />
                                {isMajor && (
                                    <LaTeX
                                        at={[x, -0.4]}
                                        tex={(i / denominator).toString()}
                                        color={isActive ? '#832EC5' : '#f8fafc'}
                                    />
                                )}
                                {!isMajor && !targetMode && (
                                    <LaTeX
                                        at={[x, 0.35]}
                                        tex={`\\frac{${i}}{${denominator}}`}
                                        color={isActive ? '#832EC5' : '#94a3b8'}
                                    />
                                )}
                            </React.Fragment>
                        );
                    })}

                    {Array.from({ length: 2 * denominator }, (_, i) => {
                        const x1 = i / denominator;
                        const x2 = (i + 1) / denominator;
                        return (
                            <Polygon
                                key={`shade-${i}`}
                                points={[[x1, -0.05], [x2, -0.05], [x2, 0.05], [x1, 0.05]]}
                                color={i % 2 === 0 ? '#832EC5' : '#AB5DDC'}
                                fillOpacity={0.1}
                            />
                        );
                    })}

                    <g transform={`translate(${nearestFraction}, 0)`}>
                        <circle r={0.08} fill="#832EC5" />
                    </g>
                    <g opacity={0.01}>
                        {point.element}
                    </g>
                </Mafs>
            </div>
        </div>
    );
};
