import React, { useState } from 'react';
import { Mafs, Line, Polygon, LaTeX, useMovablePoint } from 'mafs';
import { Latex } from '../Latex';

import 'mafs/core.css';

export const UnitFractionsNumberLine: React.FC = () => {
    const [denominator, setDenominator] = useState(3);
    const [isTargetMode, setIsTargetMode] = useState(false);
    const [targetDenominator, setTargetDenominator] = useState(4);
    const [feedback, setFeedback] = useState<string | null>(null);

    const unitFractionPoint = useMovablePoint([1 / denominator, 0], {
        constrain: ([x]) => [Math.max(0, Math.min(1, x)), 0],
        color: '#832EC5'
    });

    const checkPlacement = () => {
        const targetX = 1 / targetDenominator;
        const currentX = unitFractionPoint.x;
        const tolerance = 0.05;
        if (Math.abs(currentX - targetX) < tolerance) {
            setFeedback('correct');
        } else {
            setFeedback('incorrect');
        }
    };

    const startNewChallenge = () => {
        const denoms = [2, 3, 4, 5, 8, 10];
        const randomDenom = denoms[Math.floor(Math.random() * denoms.length)];
        setTargetDenominator(randomDenom);
        setIsTargetMode(true);
        setFeedback(null);
        unitFractionPoint.setPoint([0.5, 0]); // Start at 1/2
    };

    return (
        <div style={{ padding: '4px', color: '#f8fafc' }}>
            <div style={{ marginBottom: '10px', background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '8px' }}>


                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    {!isTargetMode ? (
                        <div>
                            <span style={{ fontSize: '0.9em', color: '#94a3b8' }}>Select Denominator: </span>
                            <div style={{ display: 'flex', gap: '8px', marginTop: '5px' }}>
                                {[2, 3, 4, 5, 8].map(d => (
                                    <button
                                        key={d}
                                        onClick={() => setDenominator(d)}
                                        style={{
                                            padding: '4px 12px',
                                            background: denominator === d ? '#832EC5' : 'rgba(255,255,255,0.1)',
                                            border: 'none',
                                            borderRadius: '4px',
                                            color: 'white',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <Latex>{`\\frac{1}{${d}}`}</Latex>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div style={{ fontSize: '1.2em', fontWeight: 'bold' }}>
                            Target: <span style={{ color: '#832EC5' }}><Latex>{`\\frac{1}{${targetDenominator}}`}</Latex></span>
                        </div>
                    )}

                    <div style={{ display: 'flex', gap: '10px' }}>
                        {isTargetMode && (
                            <button
                                onClick={checkPlacement}
                                style={{
                                    padding: '8px 20px',
                                    background: '#832EC5',
                                    border: 'none',
                                    borderRadius: '4px',
                                    color: 'white',
                                    cursor: 'pointer',
                                    fontWeight: 'bold'
                                }}
                            >
                                Check
                            </button>
                        )}
                        <button
                            onClick={() => {
                                if (isTargetMode) setIsTargetMode(false);
                                else startNewChallenge();
                            }}
                            style={{
                                padding: '8px 20px',
                                background: isTargetMode ? 'rgba(239, 68, 68, 0.2)' : '#832EC5',
                                border: `1px solid ${isTargetMode ? '#832EC5' : 'transparent'}`,
                                borderRadius: '4px',
                                color: 'white',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            {isTargetMode ? 'Exit' : 'New Challenge'}
                        </button>
                    </div>
                </div>

                {feedback && (
                    <div style={{
                        textAlign: 'center',
                        color: '#832EC5',
                        opacity: feedback === 'correct' ? 1 : 0.5,
                        fontWeight: 'bold',
                        marginBottom: '10px'
                    }}>
                        {feedback === 'correct' ? 'Perfect! You found the correct position.' : 'Not quite. Observe the tick marks carefully.'}
                    </div>
                )}
            </div>

            <div style={{ height: '800px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', overflow: 'hidden', background: '#0a0a0a' }}>
                <Mafs viewBox={{ x: [-0.1, 1.1], y: [-1, 1] }} preserveAspectRatio={false}>
                    <Line.Segment point1={[0, 0]} point2={[1, 0]} color="#94a3b8" />

                    {/* Endpoints */}
                    <LaTeX at={[0, -0.4]} tex="0" color="#94a3b8" />
                    <LaTeX at={[1, -0.4]} tex="1" color="#94a3b8" />
                    <Line.Segment point1={[0, -0.2]} point2={[0, 0.2]} color="#94a3b8" />
                    <Line.Segment point1={[1, -0.2]} point2={[1, 0.2]} color="#94a3b8" />

                    {/* Target denominator Ticks */}
                    {Array.from({ length: (isTargetMode ? targetDenominator : denominator) - 1 }).map((_, i) => {
                        const x = (i + 1) / (isTargetMode ? targetDenominator : denominator);
                        return (
                            <React.Fragment key={i}>
                                <Line.Segment
                                    point1={[x, -0.1]}
                                    point2={[x, 0.1]}
                                    color={isTargetMode ? "rgba(255,255,255,0.15)" : "#AB5DDC"}
                                />
                                {!isTargetMode && (
                                    <LaTeX at={[x, -0.4]} tex={`\\frac{${i + 1}}{${denominator}}`} color="#AB5DDC" />
                                )}
                            </React.Fragment>
                        );
                    })}

                    <Polygon
                        points={[[unitFractionPoint.x - 0.02, -0.1], [unitFractionPoint.x + 0.02, -0.1], [unitFractionPoint.x, 0.2]]}
                        color="#832EC5"
                    />

                    {unitFractionPoint.element}
                </Mafs>
            </div>
        </div>
    );
};
