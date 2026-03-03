import React from 'react';
import { Mafs, Coordinates, Plot, useMovablePoint, LaTeX } from 'mafs';
import { Latex } from '../Latex';

import 'mafs/core.css';

export const LinearGraph: React.FC = () => {
    // Two points to define the line
    const point1 = useMovablePoint([0, 1], { color: '#832EC5' });
    const point2 = useMovablePoint([2, 5], { color: '#832EC5' });

    // Calculate gradient (m) and y-intercept (c)
    // y = mx + c
    // m = (y2 - y1) / (x2 - x1)
    const run = point2.x - point1.x;
    const rise = point2.y - point1.y;

    // Avoid division by zero
    const m = Math.abs(run) < 0.05 ? (rise > 0 ? 100 : -100) : rise / run;
    const c = point1.y - m * point1.x;

    return (
        <div style={{ padding: '4px', color: '#f8fafc' }}>
            <div style={{ marginBottom: '10px', background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                <div style={{ fontSize: '1.2em', fontFamily: 'monospace' }}>
                    <Latex>{`y = ${m.toFixed(2)}x ${c >= 0 ? '+' : '-'} ${Math.abs(c).toFixed(2)}`}</Latex>
                </div>
            </div>
            <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.9em', color: '#94a3b8', marginBottom: '4px' }}>
                    Gradient (m) = <Latex>{`${m.toFixed(2)}`}</Latex> | Intercept (c) = <Latex>{`${c.toFixed(2)}`}</Latex>
                </div>
                <div style={{ fontSize: '0.9em', color: '#94a3b8', fontStyle: 'italic' }}>
                    Drag the points to change the line equation.
                </div>
            </div>


            <div style={{ height: '800px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', overflow: 'hidden' }}>
                <Mafs height={800}>
                    <Coordinates.Cartesian />

                    {/* The Line passing through points */}
                    <Plot.OfX y={(x) => m * x + c} color="#832EC5" />

                    {/* Movable Points */}
                    {point1.element}
                    {point2.element}

                    {/* Annotate Intercept */}
                    <LaTeX
                        at={[0, c]}
                        tex={`(0, ${c.toFixed(2)})`}
                        color="#832EC5"
                    />
                </Mafs>
            </div>
        </div >
    );
};
