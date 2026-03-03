import React from 'react';
import { Mafs, Coordinates, useMovablePoint, LaTeX, Line, Plot } from 'mafs';
import { Latex } from '../Latex';
import 'mafs/core.css';

export const InverseDomainRange: React.FC = () => {
    // Drag boundary 'a' for domain [a, 3] of f(x) = x^2 / 2
    const boundary = useMovablePoint([0, 0], {
        constrain: ([x]) => [Math.max(-4, Math.min(x, 4)), 0],
        color: '#832EC5'
    });

    const a = boundary.x;
    const f = (x: number) => (x * x) / 2;

    // Inverse exists if f is monotonic on [a, 4]
    // For x^2/2, it is monotonic if a >= 0 or if the domain is only on the negative side.
    const isOneToOne = a >= 0;

    return (
        <div style={{ padding: '4px' }}>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div>
                        <div style={{ color: '#832EC5', fontWeight: 'bold' }}>Function <Latex>{"f(x)"}</Latex></div>
                        <div>Domain: <Latex>{`[${a.toFixed(1)}, 4]`}</Latex></div>
                        <div>Range: <Latex>{`[${Math.min(f(a), f(4)).toFixed(1)}, ${Math.max(f(a), f(4)).toFixed(1)}]`}</Latex></div>
                    </div>
                    <div>
                        <div style={{ color: '#AB5DDC', fontWeight: 'bold' }}>Inverse Status</div>
                        <div style={{ color: '#832EC5', fontWeight: 'bold', opacity: isOneToOne ? 1 : 0.5 }}>
                            {isOneToOne ? 'One-to-one (Invertible)' : 'Many-to-one (Not invertible)'}
                        </div>
                        {isOneToOne && (
                            <div style={{ fontSize: '0.9em', color: '#94a3b8' }}>
                                Inverse Domain: <Latex>{`[${f(a).toFixed(1)}, ${f(4).toFixed(1)}]`}</Latex><br />
                                Inverse Range: <Latex>{`[${a.toFixed(1)}, 4]`}</Latex>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div style={{ height: '800px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', overflow: 'hidden', background: '#0a0a0a' }}>
                <Mafs height={800} viewBox={{ x: [-5, 5], y: [-5, 5] }}>
                    <Coordinates.Cartesian />

                    {/* Line y=x */}
                    <Line.ThroughPoints point1={[-5, -5]} point2={[5, 5]} color="#94a3b8" style="dashed" opacity={0.3} />

                    {/* f(x) on restricted domain */}
                    <Plot.OfX
                        y={f}
                        domain={[a, 4]}
                        color="#832EC5"
                        weight={4}
                    />

                    {/* f(x) ghost (unrestricted) */}
                    <Plot.OfX
                        y={f}
                        domain={[-4, 4]}
                        color="#832EC5"
                        opacity={0.1}
                    />

                    {/* Inverse (only show if one-to-one for clarity, or show reflection) */}
                    <Plot.Parametric
                        t={[a, 4]}
                        xy={(t) => [f(t), t]}
                        color="#AB5DDC"
                        weight={4}
                        opacity={isOneToOne ? 1 : 0.4}
                    />
                    {!isOneToOne && (
                        <LaTeX at={[3, -2]} tex="\text{Relation (not a function)}" color="#AB5DDC" />
                    )}

                    <Plot.OfY x={() => a} color="#AB5DDC" style="dashed" />
                    <LaTeX at={[a, -0.5]} tex={`a = ${a.toFixed(1)} `} color="#AB5DDC" />

                    {boundary.element}
                </Mafs>
            </div>
        </div>
    );
};
