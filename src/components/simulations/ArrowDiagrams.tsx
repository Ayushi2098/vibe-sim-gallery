import React, { useState } from 'react';
import { Mafs, LaTeX, Vector, Point } from 'mafs';

import 'mafs/core.css';

export const ArrowDiagrams: React.FC = () => {
    const [connections, setConnections] = useState<Record<number, number[]>>({
        0: [0],
        1: [1],
        2: [2],
        3: [1]
    });

    const inputs = [1, 2, 3, 4];
    const outputs = ['a', 'b', 'c', 'd'];

    const toggleConnection = (inIdx: number, outIdx: number) => {
        setConnections(prev => {
            const current = prev[inIdx] || [];
            const next = current.includes(outIdx)
                ? current.filter(id => id !== outIdx)
                : [...current, outIdx];
            return { ...prev, [inIdx]: next };
        });
    };

    const inputsMapped = Object.keys(connections).filter(k => connections[parseInt(k)].length > 0).length;
    const isFunction = inputs.every((_, i) => (connections[i]?.length || 0) === 1);

    const violations = inputs.map((_, i) => {
        const count = connections[i]?.length || 0;
        if (count === 0) return `Input ${inputs[i]} has no mapping.`;
        if (count > 1) return `Input ${inputs[i]} has multiple mappings (${count}).`;
        return null;
    }).filter(Boolean);

    const getInCoord = (idx: number): [number, number] => [-2, 1.5 - idx];
    const getOutCoord = (idx: number): [number, number] => [2, 1.5 - idx];

    return (
        <div style={{ padding: '4px' }}>


            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
                <div style={{ fontSize: '1.1em', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>
                        Status: {' '}
                        <span style={{ color: '#832EC5', fontWeight: 'bold', opacity: isFunction ? 1 : 0.5 }}>
                            {isFunction ? 'Function' : 'Relation (Not a function)'}
                        </span>
                    </span>
                    <span style={{ fontSize: '0.9em', color: '#94a3b8' }}>
                        {inputsMapped} of {inputs.length} inputs have mappings
                    </span>
                </div>
                {!isFunction && violations.length > 0 && (
                    <div style={{ marginTop: '10px', fontSize: '0.9em', color: '#AB5DDC', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {violations.map((v, i) => <div key={i}>• {v}</div>)}
                    </div>
                )}
            </div>

            <div style={{ height: '800px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', overflow: 'hidden', background: '#0a0a0a', position: 'relative' }}>
                <Mafs height={800} viewBox={{ x: [-4, 4], y: [-3, 3] }}>
                    {/* Set Labels */}
                    <LaTeX at={[-2, 2.2]} tex="\text{Domain } X" color="#f8fafc" />
                    <LaTeX at={[2, 2.2]} tex="\text{Codomain } Y" color="#f8fafc" />

                    {/* Inputs */}
                    {inputs.map((val, i) => (
                        <React.Fragment key={`in-${i}`}>
                            <Point x={getInCoord(i)[0]} y={getInCoord(i)[1]} color="#832EC5" />
                            <LaTeX at={[getInCoord(i)[0] - 0.5, getInCoord(i)[1]]} tex={val.toString()} color="#f8fafc" />
                        </React.Fragment>
                    ))}

                    {/* Outputs */}
                    {outputs.map((val, i) => (
                        <React.Fragment key={`out-${i}`}>
                            <Point x={getOutCoord(i)[0]} y={getOutCoord(i)[1]} color="#AB5DDC" />
                            <LaTeX at={[getOutCoord(i)[0] + 0.5, getOutCoord(i)[1]]} tex={val} color="#f8fafc" />
                        </React.Fragment>
                    ))}

                    {/* Arrows */}
                    {Object.entries(connections).flatMap(([inIdx, outIndices]) => {
                        return outIndices.map(outIdx => {
                            const start = getInCoord(parseInt(inIdx));
                            const end = getOutCoord(outIdx);
                            return (
                                <Vector
                                    key={`arrow-${inIdx}-${outIdx}`}
                                    tail={start}
                                    tip={[end[0] - 0.1, end[1]]}
                                    color="#832EC5"
                                    weight={2}
                                />
                            );
                        });
                    })}
                </Mafs>

                {/* Interaction controls for Arrow Diagram */}
                <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.8)', padding: '15px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', width: '90%' }}>
                    <div style={{ textAlign: 'center', marginBottom: '10px', fontSize: '0.9em', color: '#94a3b8' }}>
                        Toggle mappings for each input:
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px' }}>
                        {inputs.map((_, inIdx) => (
                            <div key={`ctrl-${inIdx}`} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <div style={{ fontSize: '0.8em', color: '#832EC5', textAlign: 'center', fontWeight: 'bold' }}>Input {inputs[inIdx]}</div>
                                <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', flexWrap: 'wrap' }}>
                                    {outputs.map((out, outIdx) => (
                                        <button
                                            key={outIdx}
                                            onClick={() => toggleConnection(inIdx, outIdx)}
                                            style={{
                                                width: '28px',
                                                height: '28px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                background: connections[inIdx]?.includes(outIdx) ? '#832EC5' : 'transparent',
                                                color: '#f8fafc',
                                                border: '1px solid rgba(168, 85, 247, 0.4)',
                                                borderRadius: '4px',
                                                fontSize: '0.75em',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s'
                                            }}
                                            title={`Map to ${out}`}
                                        >
                                            {out}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};
