import React from 'react';
import { Mafs, Coordinates, Plot, useMovablePoint, Point, LaTeX } from 'mafs';
import { Latex } from '../Latex';

import 'mafs/core.css';

export const LinearIntercepts: React.FC = () => {
    // Two points to define the line
    const p1 = useMovablePoint([-1, -2], { color: '#832EC5' });
    const p2 = useMovablePoint([1, 4], { color: '#832EC5' });

    const run = p2.x - p1.x;
    const rise = p2.y - p1.y;
    const m = Math.abs(run) < 0.05 ? (rise > 0 ? 100 : -100) : rise / run;
    const c = p1.y - m * p1.x;

    // Calculate intercepts
    // y-intercept: x = 0, y = c
    // x-intercept: y = 0, 0 = mx + c => x = -c / m
    const xIntercept = Math.abs(m) > 0.01 ? -c / m : null;

    return (
        <div style={{ padding: '4px' }}>


            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '8px', marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '1.2em', fontFamily: 'monospace' }}>
                    <Latex>{`y = ${m.toFixed(2)}x ${c >= 0 ? '+' : '-'} ${Math.abs(c).toFixed(2)}`}</Latex>
                </div>
                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ color: '#FFE999' }}>Y-Intercept: <Latex>{`(0, ${c.toFixed(2)})`}</Latex></div>
                    {xIntercept !== null && (
                        <div style={{ color: '#832EC5' }}>X-Intercept: <Latex>{`(${xIntercept.toFixed(2)}, 0)`}</Latex></div>
                    )}
                </div>
            </div>

            <div style={{ height: '800px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', overflow: 'hidden', background: '#0a0a0a' }}>
                <Mafs height={800}>
                    <Coordinates.Cartesian />
                    <Plot.OfX y={(x) => m * x + c} color="#832EC5" opacity={0.5} />
                    {p1.element}{p2.element}
                    <Point x={0} y={c} color="#FFE999" />
                    <LaTeX at={[0.8, c]} tex="y\text{-int}" color="#FFE999" />
                    {xIntercept !== null && Math.abs(xIntercept) < 10 && (
                        <>
                            <Point x={xIntercept} y={0} color="#832EC5" />
                            <LaTeX at={[xIntercept, 0.8]} tex="x\\text{-int}" color="#832EC5" />
                        </>
                    )}
                </Mafs>
            </div>
        </div>
    );
};
