import React, { useState } from 'react';
import { Mafs, Coordinates, Plot, useMovablePoint } from 'mafs';
import { Latex } from '../Latex';
import 'mafs/core.css';

export const QuadraticMatchGraph: React.FC = () => {
    // Target coefficients
    const [targetA, setTargetA] = useState(1);
    const [targetH, setTargetH] = useState(2);
    const [targetK, setTargetK] = useState(-1);

    const matchThreshold = 0.5;

    // User movable point to control the parabola vertex (h, k)
    const vertex = useMovablePoint([0, 0], {
        color: '#AB5DDC',
        constrain: ([x, y]) => [Math.max(-10, Math.min(10, x)), Math.max(-10, Math.min(10, y))]
    });

    const [a, setA] = useState(1);

    // Using vertex coordinates directly
    const userH = vertex.x;
    const userK = vertex.y;

    // Check if matched
    const isMatched =
        Math.abs(userH - targetH) < matchThreshold &&
        Math.abs(userK - targetK) < matchThreshold &&
        Math.abs(a - targetA) < 0.1;

    // Generate random target
    const generateNewTarget = () => {
        setTargetA(Math.random() > 0.5 ? 1 : -1);
        setTargetH(Math.floor(Math.random() * 6) - 3);
        setTargetK(Math.floor(Math.random() * 6) - 3);
        vertex.setPoint([0, 0]);
        setA(1);
    };

    return (
        <div style={{ padding: '4px', color: '#f8fafc' }}>
            <div style={{ marginBottom: '10px', background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
                <div style={{ flex: '1', marginRight: '20px' }}>
                    <div style={{ fontSize: '1.2em', fontFamily: 'monospace', color: '#832EC5', opacity: isMatched ? 1 : 0.7 }}>
                        Target: <Latex>{`y = ${targetA === -1 ? '-' : ''}(x ${targetH > 0 ? '-' : '+'} ${Math.abs(targetH)})^2 ${targetK >= 0 ? '+' : '-'} ${Math.abs(targetK)}`}</Latex>
                    </div>
                    {isMatched && <div style={{ color: '#832EC5', fontWeight: 'bold' }}>Matched!</div>}
                </div>

                {/* Controls */}
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.9em', marginBottom: '2px' }}>Width 'a': {a.toFixed(1)}</label>
                        <input
                            type="range"
                            min="-3"
                            max="3"
                            step="0.1"
                            value={a}
                            onChange={(e) => setA(parseFloat(e.target.value))}
                            style={{ width: '100px' }}
                        />
                    </div>
                </div>
            </div>

            <div style={{ height: '800px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', overflow: 'hidden', background: '#0f172a' }}>
                <Mafs
                    height={800}
                    viewBox={{ x: [-10, 10], y: [-10, 10] }}
                    preserveAspectRatio={false}
                >
                    <Coordinates.Cartesian />

                    {/* Target Graph (Dashed) */}
                    <Plot.OfX
                        y={(x) => targetA * Math.pow(x - targetH, 2) + targetK}
                        style="dashed"
                        color="#832EC5"
                        opacity={0.5}
                    />

                    {/* User Graph */}
                    <Plot.OfX
                        y={(x) => a * Math.pow(x - userH, 2) + userK}
                        color={isMatched ? "#22c55e" : "#AB5DDC"}
                        weight={3}
                    />

                    {vertex.element}
                </Mafs>
            </div>
        </div>
    );
};
