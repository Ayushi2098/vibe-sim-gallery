import React, { useState } from 'react';
import { Mafs, Line, Vector, LaTeX } from 'mafs';
import { Latex } from '../Latex';
import 'mafs/core.css';

export const SubtractionNumberLine: React.FC = () => {
    const [start, setStart] = useState(5);
    const [subtract, setSubtract] = useState(3);
    const result = start - subtract;

    return (
        <div style={{ padding: '4px' }}>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
                <div style={{ fontSize: '1.5em', marginBottom: '15px' }}>
                    <Latex>{`${start} - ${subtract} = `}</Latex><span style={{ color: '#FFE999' }}><Latex>{`${result}`}</Latex></span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Starting number: {start}</label>
                        <input
                            type="range"
                            min="-2"
                            max="10"
                            value={start}
                            onChange={(e) => setStart(parseInt(e.target.value))}
                            style={{ width: '100%', accentColor: '#832EC5' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Subtract: {subtract}</label>
                        <input
                            type="range"
                            min="0"
                            max="8"
                            value={subtract}
                            onChange={(e) => setSubtract(parseInt(e.target.value))}
                            style={{ width: '100%', accentColor: '#832EC5' }}
                        />
                    </div>
                </div>
            </div>

            <div style={{ height: '800px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', overflow: 'hidden', background: '#0a0a0a' }}>
                <Mafs viewBox={{ x: [-6, 12], y: [-1.5, 1.5] }} preserveAspectRatio={false}>
                    {/* Number line */}
                    <Line.Segment point1={[-6, 0]} point2={[12, 0]} color="#94a3b8" />

                    {/* Tick marks */}
                    {Array.from({ length: 19 }, (_, i) => i - 6).map(n => {
                        const isStart = n === start;
                        const isResult = n === result;
                        const color = isStart ? "#832EC5" : (isResult ? "#FFE999" : "#94a3b8");
                        const labelColor = isStart ? "#832EC5" : (isResult ? "#FFE999" : "#f8fafc");

                        return (
                            <React.Fragment key={n}>
                                <Line.Segment
                                    point1={[n, -0.15]}
                                    point2={[n, 0.15]}
                                    color={color}
                                    weight={isStart || isResult ? 3 : 1}
                                />
                                <LaTeX
                                    at={[n, -0.5]}
                                    tex={n.toString()}
                                    color={labelColor}
                                />
                            </React.Fragment>
                        );
                    })}

                    {/* Starting point */}
                    <circle cx={start} cy={0} r={0.12} fill="#832EC5" />
                    <LaTeX at={[start, 0.6]} tex=" \text{Start} " color="#832EC5" />

                    {/* Subtraction arrow (pointing left) */}
                    <Vector
                        tail={[start, 0.8]}
                        tip={[result, 0.8]}
                        color="#832EC5"
                    />
                    {/* Subtraction jump */}
                    <Line.Segment
                        point1={[start, 0]}
                        point2={[result, 0]}
                        color="#832EC5"
                        style="dashed"
                    />
                    <LaTeX at={[(start + result) / 2, 1.1]} tex={`-${subtract}`} color="#832EC5" />

                    {/* Result point */}
                    <circle cx={result} cy={0} r={0.12} fill="#FFE999" />
                    <LaTeX at={[result, -0.8]} tex={`\\text{Result: } ${result}`} color="#FFE999" />
                </Mafs>
            </div>
        </div>
    );
};
