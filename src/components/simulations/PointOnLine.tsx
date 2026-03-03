import React from 'react';
import { Mafs, Coordinates, Plot, useMovablePoint } from 'mafs';
import { Latex } from '../Latex';
import 'mafs/core.css';

export const PointOnLine: React.FC = () => {
    // Line equation y = 2x + 1
    const m = 2;
    const b = 1;

    const point = useMovablePoint([2, 5], { color: '#832EC5' });

    // Check if point satisfies y = mx + b
    const yOnLine = m * point.x + b;
    const isOnLine = Math.abs(point.y - yOnLine) < 0.2; // Tolerance

    return (
        <div style={{ padding: '4px', color: '#f8fafc' }}>
            <div style={{ marginBottom: '10px', background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '8px' }}>
                <div style={{ fontSize: '1.2em', marginBottom: '10px' }}>Equation: <Latex>y = 2x + 1</Latex></div>
                <div style={{ fontSize: '1.1em', fontFamily: 'monospace' }}>
                    Point: ({point.x.toFixed(1)}, {point.y.toFixed(1)})
                </div>
                <div style={{ marginTop: '10px', fontSize: '1.1em' }}>
                    Substitute <Latex>{`x = ${point.x.toFixed(1)}`}</Latex>:
                    <br />
                    <Latex>{`y = 2(${point.x.toFixed(1)}) + 1 = ${yOnLine.toFixed(1)}`}</Latex>
                </div>
                <div style={{
                    marginTop: '15px',
                    padding: '10px',
                    backgroundColor: isOnLine ? 'rgba(34, 197, 94, 0.1)' : 'rgba(249, 115, 22, 0.1)',
                    borderRadius: '4px',
                    color: '#832EC5',
                    opacity: isOnLine ? 1 : 0.5,
                    fontWeight: 'bold'
                }}>
                    {isOnLine ? 'YES, the point is on the line' : 'NO, the point is NOT on the line'}
                </div>
            </div>

            <div style={{ height: '800px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', overflow: 'hidden' }}>
                <Mafs>
                    <Coordinates.Cartesian />

                    {/* The Line */}
                    <Plot.OfX y={(x) => m * x + b} color="#832EC5" opacity={0.5} />

                    {/* The Point */}
                    {point.element}
                </Mafs>
            </div>
        </div>
    );
};
