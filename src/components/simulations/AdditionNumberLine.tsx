import React, { useState } from 'react';
import { Mafs, Line, Vector, LaTeX } from 'mafs';
import { Latex } from '../Latex';
import 'mafs/core.css';

export const AdditionNumberLine: React.FC = () => {
    const [start, setStart] = useState(2);
    const [addend, setAddend] = useState(3);
    const result = start + addend;

    return (
        <div style={{ padding: '4px' }}>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
                <div style={{ fontSize: '1.5em', marginBottom: '15px' }}>
                    <Latex>{`${start} + ${addend} = `}</Latex><span style={{ color: '#AB5DDC' }}><Latex>{`${result}`}</Latex></span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Starting number: {start}</label>
                        <input
                            type="range"
                            min="-5"
                            max="5"
                            value={start}
                            onChange={(e) => setStart(parseInt(e.target.value))}
                            style={{ width: '100%', accentColor: '#832EC5' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Add: {addend}</label>
                        <input
                            type="range"
                            min="0"
                            max="8"
                            value={addend}
                            onChange={(e) => setAddend(parseInt(e.target.value))}
                            style={{ width: '100%', accentColor: '#832EC5' }}
                        />
                    </div>
                </div>
            </div>

            <div style={{ height: '800px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', overflow: 'hidden', background: '#0a0a0a' }}>
                <Mafs viewBox={{ x: [-6, 10], y: [-1.5, 1.5] }} preserveAspectRatio={false}>
                    {/* Number line */}
                    <Line.Segment point1={[-6, 0]} point2={[10, 0]} color="#94a3b8" />

                    {/* Tick marks */}
                    {Array.from({ length: 17 }, (_, i) => i - 6).map(n => {
                        const isStart = n === start;
                        const isResult = n === result;
                        const color = isStart ? "#832EC5" : (isResult ? "#AB5DDC" : "#94a3b8");
                        const labelColor = isStart ? "#832EC5" : (isResult ? "#AB5DDC" : "#f8fafc");

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

                    {/* Addition arrow */}
                    <Vector
                        tail={[start, 0.8]}
                        tip={[result, 0.8]}
                        color="#832EC5"
                    />
                    {/* The "jump" arrow */}
                    <Line.Segment
                        point1={[start, 0]}
                        point2={[result, 0]}
                        color="#832EC5"
                        style="dashed"
                    />
                    <LaTeX at={[(start + result) / 2, 1.1]} tex={`+${addend}`} color="#832EC5" />

                    {/* Result point */}
                    <circle cx={result} cy={0} r={0.12} fill="#AB5DDC" />
                    <LaTeX at={[result, -0.8]} tex={`\\text{Result: } ${result}`} color="#AB5DDC" />
                </Mafs>
            </div>
        </div>
    );
};
