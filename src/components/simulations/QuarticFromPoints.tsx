import React, { useState } from 'react';
import { Mafs, Coordinates, Plot, Point, LaTeX } from 'mafs';
import { Latex } from '../Latex';
import 'mafs/core.css';

export const QuarticFromPoints: React.FC = () => {
    const [root1] = useState(-2);
    const [root2] = useState(-1);
    const [root3] = useState(1);
    const [root4] = useState(2);

    // Target 'a' is 0.5
    const targetA = 0.5;

    // User guesses 'a' via slider, start far off
    const [userA, setUserA] = useState(0.1);

    const isCorrect = Math.abs(userA - targetA) < 0.05;

    // The reference point the user must hit
    // P(0, yInt)
    const yInt = targetA * (-root1) * (-root2) * (-root3) * (-root4);
    // yInt = 0.5 * 2 * 1 * -1 * -2 = 0.5 * 4 = 2

    // y = a(x-r1)(x-r2)(x-r3)(x-r4)
    const quartic = (x: number, aVal: number) => aVal * (x - root1) * (x - root2) * (x - root3) * (x - root4);

    return (
        <div style={{ padding: '4px', color: '#f8fafc' }}>
            <div style={{ marginBottom: '10px', background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
                <div style={{ flex: '1', marginRight: '20px' }}>
                    <div style={{ fontSize: '1.2em', fontFamily: 'monospace', marginTop: '5px' }}>
                        <Latex>{`y = a(x - ${root1})(x - ${root2})(x - ${root3})(x - ${root4})`}</Latex>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.9em', marginBottom: '2px' }}>Value of 'a': {userA.toFixed(2)}</label>
                        <input
                            type="range"
                            min="-1"
                            max="1"
                            step="0.05"
                            value={userA}
                            onChange={(e) => setUserA(parseFloat(e.target.value))}
                            style={{ width: '150px' }}
                        />
                    </div>
                </div>
            </div>

            <div style={{ height: '800px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', overflow: 'hidden', background: '#0f172a', position: 'relative' }}>
                <Mafs
                    height={800}
                    viewBox={{ x: [-4, 4], y: [-10, 10] }}
                    preserveAspectRatio={false}
                >
                    <Coordinates.Cartesian />

                    {/* Target Point P that MUST be hit */}
                    <Point x={0} y={yInt} color="#832EC5" />
                    <LaTeX at={[0.2, yInt]} tex={`P(0, ${yInt})`} color="#832EC5" />

                    {/* User Graph */}
                    <Plot.OfX
                        y={(x) => quartic(x, userA)}
                        color="#832EC5"
                        weight={3}
                    />

                    {/* Visual roots */}
                    <Point x={root1} y={0} color="#94a3b8" />
                    <Point x={root2} y={0} color="#94a3b8" />
                    <Point x={root3} y={0} color="#94a3b8" />
                    <Point x={root4} y={0} color="#94a3b8" />

                </Mafs>

                <div style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    padding: '8px 16px',
                    background: isCorrect ? 'rgba(34, 197, 94, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                    color: isCorrect ? 'white' : '#475569',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                    {isCorrect ? "Correct Equation!" : "Adjust 'a' to hit Point P"}
                </div>
            </div>
        </div>
    );
};
