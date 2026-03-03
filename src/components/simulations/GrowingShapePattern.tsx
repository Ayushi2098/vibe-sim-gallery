import React, { useState } from 'react';
import { Mafs, Polygon, LaTeX } from 'mafs';
import { Latex } from '../Latex';

import 'mafs/core.css';

export const GrowingShapePattern: React.FC = () => {
    const [step, setStep] = useState(1);
    const [isGuessing, setIsGuessing] = useState(false);
    const [guessResult, setGuessResult] = useState<string | null>(null);

    const count = step * step;

    const handleGuess = (guess: number) => {
        if (guess === step + 1) {
            setGuessResult('correct');
            setStep(step + 1);
            setIsGuessing(false);
        } else {
            setGuessResult('incorrect');
        }
    };

    return (
        <div style={{ padding: '4px', color: '#f8fafc' }}>
            <div style={{ marginBottom: '10px', background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '8px' }}>


                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '15px',
                    padding: '10px',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '6px'
                }}>
                    <div>
                        <div style={{ fontSize: '1.1em', fontFamily: 'monospace', color: '#94a3b8' }}>
                            Step: <span style={{ color: '#832EC5', fontWeight: 'bold' }}>{step}</span>
                        </div>
                        <div style={{ fontSize: '0.9em', color: '#94a3b8', marginTop: '4px' }}>
                            Small Squares: <Latex>{`${step} \\times ${step} = ${count}`}</Latex>
                        </div>
                    </div>

                    <button
                        onClick={() => {
                            setIsGuessing(!isGuessing);
                            setGuessResult(null);
                        }}
                        style={{
                            padding: '8px 20px',
                            background: isGuessing ? '#832EC5' : 'rgba(255,255,255,0.1)',
                            border: 'none',
                            borderRadius: '4px',
                            color: 'white',
                            cursor: 'pointer',
                            fontWeight: 'bold'
                        }}
                    >
                        {isGuessing ? 'Cancel' : 'Guess Next Step'}
                    </button>
                </div>

                {!isGuessing ? (
                    <input
                        type="range"
                        min="1"
                        max="5"
                        value={step}
                        onChange={e => setStep(Number(e.target.value))}
                        style={{ width: '100%', accentColor: '#832EC5' }}
                    />
                ) : (
                    <div style={{ textAlign: 'center', padding: '10px' }}>
                        <div style={{ marginBottom: '10px', color: '#94a3b8' }}>What is the side length of the next shape?</div>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                            {[step - 1, step + 1, step + 2].filter(n => n > 0).map(n => (
                                <button
                                    key={n}
                                    onClick={() => handleGuess(n)}
                                    style={{
                                        padding: '10px 25px',
                                        fontSize: '1.2em',
                                        background: 'rgba(255,255,255,0.05)',
                                        border: '1px solid rgba(255,255,255,0.2)',
                                        borderRadius: '6px',
                                        color: 'white',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    {n}
                                </button>
                            ))}
                        </div>
                        {guessResult && (
                            <div style={{
                                marginTop: '15px',
                                color: '#832EC5',
                                opacity: guessResult === 'correct' ? 1 : 0.5,
                                fontWeight: 'bold'
                            }}>
                                {guessResult === 'correct' ? 'Correct! The square grows to ' + (step) + 'x' + (step) : 'Try again! Look at how the side length increases.'}
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div style={{ height: '800px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', overflow: 'hidden', background: '#0a0a0a' }}>
                <Mafs viewBox={{ x: [-1, 7], y: [-1, 7] }} preserveAspectRatio={false}>
                    {/* Draw grid of squares */}
                    {Array.from({ length: step }).map((_, row) =>
                        Array.from({ length: step }).map((_, col) => (
                            <Polygon
                                key={`${row}-${col}`}
                                points={[
                                    [col, row],
                                    [col + 1, row],
                                    [col + 1, row + 1],
                                    [col, row + 1]
                                ]}
                                color="#832EC5"
                                fillOpacity={0.4}
                                weight={1}
                            />
                        ))
                    )}
                    <LaTeX at={[step / 2, -0.5]} tex={step.toString()} color="#f8fafc" />
                    <LaTeX at={[-0.5, step / 2]} tex={step.toString()} color="#f8fafc" />
                </Mafs>
            </div>
        </div>
    );
};
