import React, { useState } from 'react';
import { Coordinates, Point, LaTeX, useMovablePoint, Plot, Polygon } from 'mafs';
import { Latex } from '../Latex';
import { SimulationContainer } from './SimulationContainer';

export const ArithmeticSequence: React.FC = () => {
    const [diff, setDiff] = useState(3);
    const [isChallenge, setIsChallenge] = useState(false);
    const [hiddenIndices, setHiddenIndices] = useState<number[]>([]);
    const [guesses, setGuesses] = useState<Record<number, string>>({});
    const [feedback, setFeedback] = useState<Record<number, boolean | null>>({});

    // Draggable start point at n=0
    const startPoint = useMovablePoint([0, 2], {
        constrain: ([, y]) => [0, Math.round(y)],
        color: '#832EC5'
    });

    const start = startPoint.y;
    // Show 8 terms
    const terms = Array.from({ length: 8 }, (_, n) => ({ n, val: start + n * diff }));

    const toggleChallenge = () => {
        const nextState = !isChallenge;
        setIsChallenge(nextState);
        if (nextState) {
            // Hide 2 random terms between index 3 and 7
            const indices = [Math.floor(Math.random() * 3) + 3, 7];
            setHiddenIndices(indices);
            setGuesses({});
            setFeedback({});
        } else {
            setHiddenIndices([]);
        }
    };

    const handleCheck = (index: number) => {
        const correctVal = terms[index].val;
        const isCorrect = Number(guesses[index]) === correctVal;
        setFeedback({ ...feedback, [index]: isCorrect });
    };

    return (
        <SimulationContainer
            title="Arithmetic Sequence"
            tooltip="Drag the purple point up and down to change the start value. Use the slider to adjust the common difference."
            subtitle={
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px',
                    marginTop: '10px',
                    padding: '12px',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.05)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ fontSize: '0.9em', color: '#94a3b8' }}>Common Difference (d):</span>
                            {!isChallenge ? (
                                <>
                                    <input
                                        type="range"
                                        min="-5"
                                        max="5"
                                        step="1"
                                        value={diff}
                                        onChange={e => setDiff(Number(e.target.value))}
                                        style={{ width: '150px', accentColor: '#832EC5', cursor: 'pointer' }}
                                    />
                                    <span style={{ minWidth: '20px', fontWeight: 'bold' }}>{diff}</span>
                                </>
                            ) : (
                                <span style={{ color: '#832EC5', fontWeight: 'bold' }}>Hidden</span>
                            )}
                        </div>

                        <button
                            onClick={toggleChallenge}
                            style={{
                                padding: '6px 16px',
                                background: isChallenge ? '#832EC5' : 'rgba(255,255,255,0.1)',
                                border: 'none',
                                borderRadius: '4px',
                                color: 'white',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            {isChallenge ? 'Exit Challenge' : 'Start Challenge'}
                        </button>
                    </div>

                    <div style={{ display: 'flex', gap: '15px' }}>
                        <div style={{
                            background: 'rgba(168, 85, 247, 0.1)',
                            padding: '4px 12px',
                            borderRadius: '6px',
                            border: '1px solid rgba(168, 85, 247, 0.2)',
                            color: '#e9d5ff',
                            fontSize: '0.95em'
                        }}>
                            {!isChallenge ? (
                                <Latex>{`a_n = ${start} + (n-1)(${diff})`}</Latex>
                            ) : (
                                <Latex>{`a_n = ? + (n-1)(?)`}</Latex>
                            )}
                        </div>
                    </div>
                </div>
            }
            viewBox={{ x: [-1, 8], y: [-12, 32] }}
            preserveAspectRatio={false}
        >
            <Coordinates.Cartesian
                xAxis={{
                    labels: (n) => n >= 0 ? n.toString() : "",
                    lines: 1
                }}
                yAxis={{
                    labels: (n) => n % 5 === 0 ? n.toString() : "",
                    lines: 5
                }}
            />

            {/* Connecting arcs (Hops) */}
            {terms.slice(0, -1).map((t, i) => {
                const next = terms[i + 1];
                const midX = (t.n + next.n) / 2;
                const arcHeight = 14;
                const marginStart = 0.15;
                const marginEnd = 0.15;

                const base = (t.val + next.val) / 2;
                const m = (t.n + next.n) / 2;
                const w = (next.n - t.n) / 2;
                const halfW = w;

                const getAngle = (x: number) => Math.atan2(-2 * arcHeight * (x - m) / (w * w), 1);

                const startX = t.n + marginStart;
                const endX = next.n - marginEnd;

                const endY = base + arcHeight * (1 - Math.pow((endX - midX) / halfW, 2));
                const angleEnd = getAngle(endX);

                return (
                    <React.Fragment key={`step-${i}`}>
                        <Plot.OfX
                            y={(x: number) => base + arcHeight * (1 - Math.pow((x - m) / w, 2))}
                            domain={[startX, endX]}
                            color="#FFC700"
                            opacity={0.85}
                            weight={2.5}
                        />

                        <Polygon
                            points={[
                                [endX, endY],
                                [
                                    endX - 0.25 * Math.cos(angleEnd) - 0.04 * Math.sin(angleEnd),
                                    endY - (0.25 * Math.sin(angleEnd) - 0.04 * Math.cos(angleEnd)) * 0.2
                                ],
                                [
                                    endX - 0.25 * Math.cos(angleEnd) + 0.04 * Math.sin(angleEnd),
                                    endY - (0.25 * Math.sin(angleEnd) + 0.04 * Math.cos(angleEnd)) * 0.2
                                ]
                            ]}
                            color="#FFC700"
                            fillOpacity={0.95}
                            strokeOpacity={0}
                            weight={0}
                        />

                        {/* +d label - hidden in challenge */}
                        {!isChallenge && (
                            <LaTeX
                                at={[midX, base + arcHeight + 1.5]}
                                tex={diff >= 0 ? `+${diff}` : `${diff}`}
                                color="#FFC700"
                            />
                        )}
                    </React.Fragment>
                );
            })}

            {/* Sequence Points */}
            {terms.map((t) => {
                const isHidden = hiddenIndices.includes(t.n);
                return (
                    <React.Fragment key={t.n}>
                        <Point x={t.n} y={t.val} color={t.n === 0 ? "#832EC5" : "#FFC700"} />
                        {!isHidden ? (
                            <LaTeX
                                at={[t.n, t.val - 2]}
                                tex={t.val.toString()}
                                color={t.n === 0 ? "#832EC5" : "#FFC700"}
                            />
                        ) : (
                            <foreignObject x={t.n - 0.5} y={- (t.val + 5)} width="1" height="1" style={{ overflow: 'visible' }}>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '5px'
                                }}>
                                    <input
                                        type="number"
                                        value={guesses[t.n] || ''}
                                        onChange={(e) => setGuesses({ ...guesses, [t.n]: e.target.value })}
                                        style={{
                                            width: '40px',
                                            background: feedback[t.n] === true ? 'rgba(34, 197, 94, 0.2)' : feedback[t.n] === false ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255,255,255,0.1)',
                                            border: `1px solid ${feedback[t.n] === true ? '#832EC5' : feedback[t.n] === false ? 'rgba(131,46,197,0.3)' : 'rgba(255,255,255,0.3)'}`,
                                            borderRadius: '4px',
                                            color: 'white',
                                            textAlign: 'center',
                                            padding: '2px'
                                        }}
                                    />
                                    <button
                                        onClick={() => handleCheck(t.n)}
                                        style={{
                                            fontSize: '10px',
                                            padding: '2px 6px',
                                            background: 'rgba(255,255,255,0.1)',
                                            border: '1px solid rgba(255,255,255,0.2)',
                                            borderRadius: '3px',
                                            color: 'white',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Check
                                    </button>
                                </div>
                            </foreignObject>
                        )}
                    </React.Fragment>
                );
            })}

            {/* Draggable start handle - disabled in challenge */}
            {!isChallenge && startPoint.element}
        </SimulationContainer>
    );
};

