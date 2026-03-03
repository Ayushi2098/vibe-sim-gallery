import React, { useState } from 'react';
import { Mafs, Polygon, Line } from 'mafs';

import 'mafs/core.css';

export const HalvesAndQuarters: React.FC = () => {
    const [partitions, setPartitions] = useState<2 | 4>(2);
    const [shaded, setShaded] = useState<number[]>([]);
    const [target, setTarget] = useState({ count: 1, type: 2 }); // e.g., 1 half

    const toggleShade = (index: number) => {
        if (shaded.includes(index)) {
            setShaded(shaded.filter(i => i !== index));
        } else {
            setShaded([...shaded, index]);
        }
    };

    const generateNew = () => {
        const type = Math.random() > 0.5 ? 2 : 4;
        const count = Math.floor(Math.random() * (type - 1)) + 1;
        setTarget({ count, type });
        setShaded([]);
        setPartitions(type as 2 | 4);
    };

    const isCorrect = shaded.length === target.count && partitions === target.type;

    return (
        <div style={{ padding: '4px', color: '#f8fafc' }}>
            <div style={{ marginBottom: '10px', background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '8px' }}>


                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div style={{ fontSize: '1.3em', color: '#94a3b8' }}>
                        Task: Shade <span style={{ color: '#832EC5', fontWeight: 'bold' }}>
                            {target.count} {target.type === 2 ? 'half' : 'quarter'}{target.count > 1 ? 's' : ''}
                        </span>
                    </div>
                    <button onClick={generateNew} style={{ padding: '8px 20px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '4px', color: 'white', cursor: 'pointer' }}>New Challenge</button>
                </div>

                <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                    <div style={{ flex: 1 }}>
                        <div style={{ marginBottom: '10px', fontSize: '0.9em', color: '#94a3b8' }}>Partition into:</div>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button
                                onClick={() => { setPartitions(2); setShaded([]); }}
                                style={{ flex: 1, padding: '10px', background: partitions === 2 ? '#832EC5' : 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '4px', color: 'white', cursor: 'pointer' }}
                            >
                                Halves (2)
                            </button>
                            <button
                                onClick={() => { setPartitions(4); setShaded([]); }}
                                style={{ flex: 1, padding: '10px', background: partitions === 4 ? '#832EC5' : 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '4px', color: 'white', cursor: 'pointer' }}
                            >
                                Quarters (4)
                            </button>
                        </div>
                    </div>
                </div>

                {isCorrect && (
                    <div style={{ textAlign: 'center', color: '#832EC5', fontWeight: 'bold' }}>
                        Correct! You have shaded {target.count}/{target.type} of the shape.
                    </div>
                )}
            </div>

            <div style={{ height: '800px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', background: '#0a0a0a', overflow: 'hidden' }}>
                <Mafs viewBox={{ x: [-5, 5], y: [-3, 3] }} preserveAspectRatio={false}>
                    {/* Main Shape */}
                    <Polygon points={[[-4, -2], [4, -2], [4, 2], [-4, 2]]} color="#94a3b8" fillOpacity={0} weight={2} />

                    {/* Partition Lines and Clickable Regions */}
                    {Array.from({ length: partitions }).map((_, i) => {
                        const width = 8 / partitions;
                        const x = -4 + i * width;
                        const isShaded = shaded.includes(i);

                        return (
                            <React.Fragment key={i}>
                                <Polygon
                                    points={[
                                        [x, -2],
                                        [x + width, -2],
                                        [x + width, 2],
                                        [x, 2]
                                    ]}
                                    color={isShaded ? "#832EC5" : "transparent"}
                                    fillOpacity={isShaded ? 0.6 : 0}
                                />
                                {i > 0 && (
                                    <Line.Segment point1={[x, -2]} point2={[x, 2]} color="rgba(255,255,255,0.2)" weight={1} />
                                )}
                            </React.Fragment>
                        );
                    })}
                </Mafs>
            </div>
            <div style={{ textAlign: 'center', marginTop: '15px' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.9em', marginBottom: '10px' }}>Shade sections:</div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                    {Array.from({ length: partitions }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => toggleShade(i)}
                            style={{
                                padding: '8px 16px',
                                background: shaded.includes(i) ? '#832EC5' : 'rgba(255,255,255,0.1)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                borderRadius: '4px',
                                color: 'white',
                                cursor: 'pointer',
                                minWidth: '80px'
                            }}
                        >
                            Section {i + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
