import React, { useState } from 'react';
import { Mafs, Polygon } from 'mafs';

import 'mafs/core.css';

export const IdentifyFractionsImages: React.FC = () => {
    const [totalParts, setTotalParts] = useState(4);
    const [shadedParts, setShadedParts] = useState(1);
    const [guess, setGuess] = useState({ num: '', den: '' });
    const [feedback, setFeedback] = useState<string | null>(null);
    const [shapeType, setShapeType] = useState<'circle' | 'rectangle'>('rectangle');

    const generateNew = () => {
        const newTotal = [2, 3, 4, 5, 6, 8][Math.floor(Math.random() * 6)];
        const newShaded = Math.floor(Math.random() * (newTotal - 1)) + 1;
        setTotalParts(newTotal);
        setShadedParts(newShaded);
        setGuess({ num: '', den: '' });
        setFeedback(null);
        setShapeType(Math.random() > 0.5 ? 'circle' : 'rectangle');
    };

    const checkAnswer = () => {
        if (Number(guess.num) === shadedParts && Number(guess.den) === totalParts) {
            setFeedback('correct');
        } else {
            setFeedback('incorrect');
        }
    };

    return (
        <div style={{ padding: '4px', color: '#f8fafc' }}>
            <div style={{ marginBottom: '10px', background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '8px' }}>


                <div style={{ display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                        <input
                            type="number"
                            placeholder="Numerator"
                            value={guess.num}
                            onChange={e => setGuess({ ...guess, num: e.target.value })}
                            style={{ width: '80px', padding: '8px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '4px', color: 'white', textAlign: 'center' }}
                        />
                        <div style={{ width: '80px', height: '2px', background: '#f8fafc' }} />
                        <input
                            type="number"
                            placeholder="Denominator"
                            value={guess.den}
                            onChange={e => setGuess({ ...guess, den: e.target.value })}
                            style={{ width: '80px', padding: '8px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '4px', color: 'white', textAlign: 'center' }}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <button
                            onClick={checkAnswer}
                            style={{ padding: '10px 25px', background: '#832EC5', border: 'none', borderRadius: '4px', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}
                        >
                            Check Answer
                        </button>
                        <button
                            onClick={generateNew}
                            style={{ padding: '8px 25px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '4px', color: 'white', cursor: 'pointer' }}
                        >
                            New Shape
                        </button>
                    </div>
                </div>

                {feedback && (
                    <div style={{ textAlign: 'center', color: '#832EC5', fontWeight: 'bold', opacity: feedback === 'correct' ? 1 : 0.5 }}>
                        {feedback === 'correct' ? 'Correct! Well done.' : 'Try again. Count the total parts and the shaded parts.'}
                    </div>
                )}
            </div>

            <div style={{ height: '800px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', background: '#0a0a0a', overflow: 'hidden' }}>
                <Mafs viewBox={{ x: [-5, 5], y: [-5, 5] }} preserveAspectRatio={false}>
                    {shapeType === 'rectangle' ? (
                        // Rectangle partition
                        Array.from({ length: totalParts }).map((_, i) => {
                            const width = 8 / totalParts;
                            const x = -4 + i * width;
                            return (
                                <Polygon
                                    key={i}
                                    points={[
                                        [x, -2],
                                        [x + width, -2],
                                        [x + width, 2],
                                        [x, 2]
                                    ]}
                                    color={i < shadedParts ? "#832EC5" : "#AB5DDC"}
                                    fillOpacity={i < shadedParts ? 0.6 : 0.1}
                                    weight={2}
                                />
                            );
                        })
                    ) : (
                        // Circle partition (Pizza slices)
                        Array.from({ length: totalParts }).map((_, i) => {
                            const angle = (2 * Math.PI) / totalParts;
                            const startAngle = i * angle;

                            // Generate arc points
                            const points: [number, number][] = [[0, 0]];
                            const segments = 20;
                            for (let j = 0; j <= segments; j++) {
                                const theta = startAngle + (j / segments) * angle;
                                points.push([3 * Math.cos(theta), 3 * Math.sin(theta)]);
                            }

                            return (
                                <Polygon
                                    key={i}
                                    points={points}
                                    color={i < shadedParts ? "#832EC5" : "#AB5DDC"}
                                    fillOpacity={i < shadedParts ? 0.6 : 0.1}
                                    weight={2}
                                />
                            );
                        })
                    )}
                </Mafs>
            </div>
        </div>
    );
};
