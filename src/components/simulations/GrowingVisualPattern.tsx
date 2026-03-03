import React, { useState } from 'react';
import { Mafs, Line } from 'mafs';
import { Latex } from '../Latex';

import 'mafs/core.css';

export const GrowingVisualPattern: React.FC = () => {
    const [step, setStep] = useState(1);
    const [isGuessing, setIsGuessing] = useState(false);
    const [guessResult, setGuessResult] = useState<string | null>(null);

    // Pattern: Matchstick squares
    // 1 square = 4 sticks
    // 2 squares = 7 sticks
    // 3 squares = 10 sticks
    // Formula: 3n + 1
    const sticks = 3 * step + 1;

    const handleGuess = (guess: number) => {
        const nextSticks = 3 * (step + 1) + 1;
        if (guess === nextSticks) {
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
                            Step (Squares): <span style={{ color: '#832EC5', fontWeight: 'bold' }}>{step}</span>
                        </div>
                        <div style={{ fontSize: '0.9em', color: '#94a3b8', marginTop: '4px' }}>
                            Sticks: <Latex>{`3(${step}) + 1 = ${sticks}`}</Latex>
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
                        {isGuessing ? 'Cancel' : 'Guess Next Sticks'}
                    </button>
                </div>

                {!isGuessing ? (
                    <input
                        type="range"
                        min="1"
                        max="8"
                        value={step}
                        onChange={e => setStep(Number(e.target.value))}
                        style={{ width: '100%', accentColor: '#832EC5' }}
                    />
                ) : (
                    <div style={{ textAlign: 'center', padding: '10px' }}>
                        <div style={{ marginBottom: '10px', color: '#94a3b8' }}>How many sticks will be in the next image (step {step + 1})?</div>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                            {[sticks + 3, sticks + 4, sticks + 5].map(n => (
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
                                {guessResult === 'correct' ? 'Correct! Each new square adds 3 more sticks.' : 'Try again! Hint: Each new square sharing a side only needs 3 extra sticks.'}
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div style={{ height: '800px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', overflow: 'hidden', background: '#0a0a0a' }}>
                <Mafs viewBox={{ x: [-1, 9], y: [-1.5, 1.5] }} preserveAspectRatio={false}>
                    {Array.from({ length: step }).map((_, i) => (
                        <React.Fragment key={i}>
                            <Line.Segment point1={[i, 0.5]} point2={[i + 1, 0.5]} color="#832EC5" weight={4} />
                            <Line.Segment point1={[i, -0.5]} point2={[i + 1, -0.5]} color="#832EC5" weight={4} />
                            <Line.Segment point1={[i, -0.5]} point2={[i, 0.5]} color="#832EC5" weight={4} />
                            {i === step - 1 && (
                                <Line.Segment point1={[i + 1, -0.5]} point2={[i + 1, 0.5]} color="#832EC5" weight={4} />
                            )}
                        </React.Fragment>
                    ))}
                </Mafs>
            </div>
        </div>
    );
};
