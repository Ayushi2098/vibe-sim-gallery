import React, { useState } from 'react';
import { Latex } from '../Latex';


export const RepeatingPatterns: React.FC = () => {
    // Simple shape pattern simulation
    // Shapes: Circle, Square, Triangle, Diamond
    const shapes = ['●', '■', '▲', '◆'];
    const colors = ['#832EC5', '#AB5DDC', '#22c55e', '#eab308'];

    // Pattern definition: e.g. Circle, Square, Circle, Square... or C, S, T, C, S, T...
    // Let's generate a pattern.
    const [patternType, setPatternType] = useState(0); // 0: AB, 1: ABC, 2: AAB

    const patterns = [
        [0, 1],       // ABAB...
        [0, 1, 2],    // ABCABC...
        [0, 0, 1],    // AABAAB...
        [0, 1, 3]     // AB D..
    ];

    const currentPattern = patterns[patternType];
    const sequenceLength = 6;

    // Generate sequence
    const sequence = [];
    for (let i = 0; i < sequenceLength; i++) {
        sequence.push(currentPattern[i % currentPattern.length]);
    }

    // The user needs to guess the 7th item (index 6)
    const nextItemIndex = sequenceLength % currentPattern.length;
    const correctShape = currentPattern[nextItemIndex];

    const [message, setMessage] = useState<string | null>(null);

    const handleGuess = (shapeIndex: number) => {
        if (shapeIndex === correctShape) {
            setMessage('Correct! The pattern continues.');
        } else {
            setMessage('Try again. Look at the repeating sequence.');
        }
    };

    return (
        <div style={{ padding: '4px', color: '#f8fafc' }}>
            <div style={{ marginBottom: '10px', background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '8px' }}>


                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '15px',
                    fontSize: '3rem',
                    marginBottom: '40px',
                    background: 'rgba(255,255,255,0.05)',
                    padding: '20px',
                    borderRadius: '12px'
                }}>
                    {sequence.map((shapeIdx, i) => (
                        <div key={i} style={{ color: colors[shapeIdx] }}>
                            {shapes[shapeIdx]}
                        </div>
                    ))}
                    <div style={{ border: '2px dashed rgba(255,255,255,0.2)', width: '3rem', height: '3rem', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                        ?
                    </div>
                </div>

                <div style={{ marginBottom: '10px' }}>What comes next?</div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                    {shapes.map((shape, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleGuess(idx)}
                            style={{
                                fontSize: '2rem',
                                padding: '15px 25px',
                                background: 'rgba(255,255,255,0.1)',
                                border: '2px solid transparent',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                color: colors[idx],
                                transition: 'all 0.2s'
                            }}
                        >
                            {shape}
                        </button>
                    ))}
                </div>

                {message && (
                    <div style={{
                        marginTop: '30px',
                        fontSize: '1.2em',
                        color: '#832EC5',
                        opacity: message.startsWith('Correct') ? 1 : 0.5,
                        fontWeight: 'bold'
                    }}>
                        {message.startsWith('Correct') ? (
                            <Latex>{`\\text{Correct! The pattern continues.}`}</Latex>
                        ) : (
                            <Latex>{`\\text{Try again. Look at the repeating sequence.}`}</Latex>
                        )}
                    </div>
                )}
            </div>

            <div style={{ marginTop: '50px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
                <div style={{ marginBottom: '10px', color: '#94a3b8' }}>Change Pattern Type:</div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    <button onClick={() => { setPatternType(0); setMessage(null); }} style={{ padding: '8px 16px' }}>AB</button>
                    <button onClick={() => { setPatternType(1); setMessage(null); }} style={{ padding: '8px 16px' }}>ABC</button>
                    <button onClick={() => { setPatternType(2); setMessage(null); }} style={{ padding: '8px 16px' }}>AAB</button>
                    <button onClick={() => { setPatternType(3); setMessage(null); }} style={{ padding: '8px 16px' }}>ABD</button>
                </div>
            </div>
        </div>
    );
};
