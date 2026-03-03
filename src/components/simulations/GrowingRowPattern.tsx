import React, { useState } from 'react';
import { Mafs, Polygon } from 'mafs';
import { Latex } from '../Latex';

import 'mafs/core.css';

export const GrowingRowPattern: React.FC = () => {
    const [rows, setRows] = useState(3);
    const [isGuessing, setIsGuessing] = useState(false);
    const [guessResult, setGuessResult] = useState<string | null>(null);

    // Pattern: Triangle number pattern (1, 2, 3...)

    const handleGuess = (guess: number) => {
        if (guess === rows + 1) {
            setGuessResult('correct');
            setRows(rows + 1);
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
                            Current Rows: <span style={{ color: '#832EC5', fontWeight: 'bold' }}>{rows}</span>
                        </div>
                        <div style={{ fontSize: '0.9em', color: '#94a3b8', marginTop: '4px' }}>
                            Next Row Items: <Latex>{`${rows} + 1 = ${rows + 1}`}</Latex>
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
                        {isGuessing ? 'Cancel' : 'Guess Next Row'}
                    </button>
                </div>

                {!isGuessing ? (
                    <input
                        type="range"
                        min="1"
                        max="8"
                        value={rows}
                        onChange={e => setRows(Number(e.target.value))}
                        style={{ width: '100%', accentColor: '#832EC5' }}
                    />
                ) : (
                    <div style={{ textAlign: 'center', padding: '10px' }}>
                        <div style={{ marginBottom: '10px', color: '#94a3b8' }}>How many items will be in the next row?</div>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                            {[rows, rows + 1, rows + 2].map(n => (
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
                                {guessResult === 'correct' ? 'Correct! Row ' + (rows) + ' has ' + rows + ' items.' : 'Try again! Look at the sequence: 1, 2, 3...'}
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div style={{ height: '800px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', overflow: 'hidden', background: '#0a0a0a' }}>
                <Mafs viewBox={{ x: [-5, 5], y: [0, 10] }} preserveAspectRatio={false}>
                    {Array.from({ length: rows }).map((_, r) => {
                        const itemsInRow = r + 1;
                        const startX = -(itemsInRow - 1) * 0.5;

                        return Array.from({ length: itemsInRow }).map((_, c) => (
                            <Polygon
                                key={`${r}-${c}`}
                                points={[
                                    [startX + c - 0.4, 9 - r - 0.4],
                                    [startX + c + 0.4, 9 - r - 0.4],
                                    [startX + c + 0.4, 9 - r + 0.4],
                                    [startX + c - 0.4, 9 - r + 0.4]
                                ]}
                                color="#832EC5"
                                fillOpacity={0.8}
                                weight={1}
                            />
                        ));
                    })}
                </Mafs>
            </div>
        </div>
    );
};
