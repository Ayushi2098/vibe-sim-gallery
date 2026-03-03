import React, { useState } from 'react';
import { Point, Line, LaTeX, Plot, useMovablePoint, Polygon } from 'mafs';
import { Latex } from '../Latex';
import { SimulationContainer } from './SimulationContainer';

export const FractionSequence: React.FC = () => {
    const denom = 4;

    // Draggable start point
    const startPoint = useMovablePoint([0.25, 0], {
        constrain: ([x]) => [Math.max(0, Math.min(2, Math.round(x * denom) / denom)), 0],
        color: '#832EC5'
    });

    const [diffNum, setDiffNum] = useState(2);

    // Derived values
    const startNum = Math.round(startPoint.x * denom);
    const diffVal = diffNum / denom;

    const terms = Array.from({ length: 6 }, (_, n) => {
        const num = startNum + n * diffNum;
        const x = startPoint.x + n * diffVal;
        return { n, num, x };
    });


    return (
        <SimulationContainer
            title="Arithmetic Sequence with Fractions"
            tooltip="Drag the purple point to change the start. Use the slider to adjust the common difference."
            subtitle={
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '30px',
                    marginTop: '10px',
                    padding: '12px',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.05)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '0.9em', color: '#94a3b8' }}>Common Difference (d):</span>
                        <input
                            type="range"
                            min="1"
                            max="4"
                            step="1"
                            value={diffNum}
                            onChange={e => setDiffNum(Number(e.target.value))}
                            style={{ width: '150px', accentColor: '#832EC5', cursor: 'pointer' }}
                        />
                        <span style={{ minWidth: '40px' }}><Latex>{`\\frac{${diffNum}}{${denom}}`}</Latex></span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#94a3b8', fontSize: '0.9em' }}>
                        <span>Current Start:</span>
                        <span style={{ color: '#832EC5', fontWeight: 'bold' }}>
                            <Latex>{`\\frac{${startNum}}{${denom}}`}</Latex>
                        </span>
                    </div>
                </div>
            }
            viewBox={{ x: [-0.2, 5.5], y: [-2.2, 2.4] }}
            preserveAspectRatio={false}
        >
            {/* Grid & Axes */}
            <Line.Segment point1={[0, 0]} point2={[6, 0]} color="#334155" weight={2} />

            {/* Ticks */}
            {Array.from({ length: 25 }, (_, i) => {
                const x = i / 4;
                const isMajor = i % 4 === 0;
                return (
                    <React.Fragment key={i}>
                        <Line.Segment
                            point1={[x, -0.1]}
                            point2={[x, 0.1]}
                            color={isMajor ? "#94a3b8" : "rgba(255,255,255,0.15)"}
                            weight={isMajor ? 2 : 1}
                        />
                        {isMajor && (
                            <LaTeX at={[x, -0.7]} tex={`\\large ${Math.round(x)}`} color="#94a3b8" />
                        )}
                    </React.Fragment>
                );
            })}

            {/* Arcs (Hops) */}
            {terms.slice(0, 5).map((t, i) => {
                const next = terms[i + 1];
                const midX = (t.x + next.x) / 2;
                const arcHeight = diffVal * 1.5;
                const marginStart = 0.05;
                const marginEnd = 0;
                const halfW = (next.x - t.x) / 2;

                const getAngle = (x: number) => Math.atan2(-2 * arcHeight * (x - midX) / (halfW * halfW), 1);

                const startX = t.x + marginStart;
                const endX = next.x - marginEnd;

                const endY = arcHeight * (1 - Math.pow((endX - midX) / halfW, 2));

                const angleEnd = getAngle(endX);

                return (
                    <React.Fragment key={`hop-${i}`}>
                        <Plot.OfX
                            y={(x) => arcHeight * (1 - Math.pow((x - midX) / halfW, 2))}
                            domain={[startX, endX]}
                            color="#FFC700"
                            opacity={0.5}
                        />

                        {/* End Arrowhead - Tip at endX */}
                        <Polygon
                            points={[
                                [endX, endY],
                                [
                                    endX - 0.15 * Math.cos(angleEnd) - 0.06 * Math.sin(angleEnd),
                                    endY - (0.15 * Math.sin(angleEnd) - 0.06 * Math.cos(angleEnd))
                                ],
                                [
                                    endX - 0.15 * Math.cos(angleEnd) + 0.06 * Math.sin(angleEnd),
                                    endY - (0.15 * Math.sin(angleEnd) + 0.06 * Math.cos(angleEnd))
                                ]
                            ]}
                            color="#FFC700"
                            fillOpacity={1}
                            weight={0}
                        />

                        <LaTeX
                            at={[midX, arcHeight + 0.4]}
                            tex={`+ \\frac{${diffNum}}{${denom}}`}
                            color="#FFC700"
                        />
                    </React.Fragment>
                );
            })}

            {/* Sequence Points */}
            {terms.map((t, i) => (
                <React.Fragment key={`point-${i}`}>
                    {i > 0 && <Point x={t.x} y={0} color="#FFC700" opacity={0.6} />}
                    <LaTeX
                        at={[t.x, -0.6 - (i % 2) * 0.8]}
                        tex={`\\Large\\displaystyle \\frac{${t.num}}{${denom}}`}
                        color={i === 0 ? "#832EC5" : "#FFC700"}
                    />
                </React.Fragment>
            ))}

            {/* Start point handle */}
            {startPoint.element}
            <LaTeX at={[startPoint.x, 0.5]} tex={`\\Large \\text{Start}`} color="#832EC5" />

        </SimulationContainer>
    );
};
