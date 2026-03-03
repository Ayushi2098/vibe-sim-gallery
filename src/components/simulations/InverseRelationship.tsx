import React from 'react';
import { Mafs, Coordinates, useMovablePoint, LaTeX, Line, Plot, Point } from 'mafs';
import { Latex } from '../Latex';

import 'mafs/core.css';

export const InverseRelationship: React.FC = () => {
    // Function: f(x) = 2^x
    const f = (x: number) => Math.pow(2, x);
    // Inverse: f^-1(x) = log2(x)
    const finv = (x: number) => Math.log(x) / Math.log(2);

    const p = useMovablePoint([1, 2], {
        constrain: ([x]) => [x, f(x)],
        color: '#832EC5'
    });

    const reflectedP: [number, number] = [p.y, p.x];

    return (
        <div style={{ padding: '4px' }}>


            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', textAlign: 'center' }}>
                    <div style={{ color: '#832EC5' }}>
                        <div style={{ fontWeight: 'bold' }}>Function <Latex>{"f(x) = 2^x"}</Latex></div>
                        <div style={{ fontSize: '1.2em' }}><Latex>{`(${p.x.toFixed(2)}, ${p.y.toFixed(2)})`}</Latex></div>
                    </div>
                    <div style={{ color: '#FFC700' }}>
                        <div style={{ fontWeight: 'bold' }}>Inverse <Latex>{"f^{-1}(x) = \\log_2(x)"}</Latex></div>
                        <div style={{ fontSize: '1.2em' }}><Latex>{`(${reflectedP[0].toFixed(2)}, ${reflectedP[1].toFixed(2)})`}</Latex></div>
                    </div>
                </div>
            </div>

            <div style={{ height: '800px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', overflow: 'hidden', background: '#0a0a0a' }}>
                <Mafs height={800} viewBox={{ x: [-5, 5], y: [-5, 5] }}>
                    <Coordinates.Cartesian />

                    {/* Line y=x */}
                    <Line.ThroughPoints point1={[-5, -5]} point2={[5, 5]} color="#94a3b8" style="dashed" opacity={0.5} />
                    <LaTeX at={[4.2, 4.5]} tex="y=x" color="#94a3b8" />

                    {/* f(x) */}
                    <Plot.OfX y={f} color="#832EC5" weight={3} />

                    {/* f^-1(x) */}
                    <Plot.OfX y={finv} color="#FFC700" weight={3} />

                    {/* Reflection line */}
                    <Line.Segment point1={[p.x, p.y]} point2={reflectedP} color="#FFE999" style="dashed" opacity={0.6} />

                    {/* Points */}
                    {p.element}
                    <Point x={reflectedP[0]} y={reflectedP[1]} color="#FFE999" />

                    <LaTeX at={[p.x + 0.8, p.y]} tex={`(${p.x.toFixed(1)}, ${p.y.toFixed(1)})`} color="#832EC5" />
                    <LaTeX at={[reflectedP[0] + 0.8, reflectedP[1]]} tex={`(${reflectedP[0].toFixed(1)}, ${reflectedP[1].toFixed(1)})`} color="#FFE999" />
                </Mafs>
            </div>
        </div>
    );
};
