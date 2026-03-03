import React from 'react';
import { Mafs, Coordinates, Plot, useMovablePoint } from 'mafs';
import { Latex } from '../Latex';
import 'mafs/core.css';

export const InstantaneousRateOfChange: React.FC = () => {
    // Function: y = sin(x) + 1
    const func = (x: number) => Math.sin(x) + 1;
    // Derivative: y' = cos(x)
    const derivative = (x: number) => Math.cos(x);

    const point = useMovablePoint([0, 1], {
        constrain: (p) => [p[0], func(p[0])],
        color: '#832EC5'
    });

    const x = point.x;
    const y = point.y;
    const slope = derivative(x);

    // Tangent line equation: Y - y = m(X - x) => Y = m(X - x) + y
    const tangent = (X: number) => slope * (X - x) + y;

    return (
        <div style={{ padding: '4px', color: '#f8fafc' }}>
            <div style={{ marginBottom: '10px', background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ fontSize: '1.1em' }}>
                    Function: <Latex>{`f(x) = \\sin(x) + 1`}</Latex>
                </div>
                <div style={{ fontSize: '1.2em' }}>
                    Slope (Tangent) at <Latex>{`x = ${x.toFixed(2)}`}</Latex>:
                    <br />
                    <Latex>{`m = f'(${x.toFixed(2)}) = ${slope.toFixed(2)}`}</Latex>
                </div>
            </div>

            <div style={{ height: '800px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', overflow: 'hidden' }}>
                <Mafs viewBox={{ x: [-Math.PI * 2, Math.PI * 2], y: [-1, 4] }} preserveAspectRatio={false}>
                    <Coordinates.Cartesian />

                    <Plot.OfX y={func} color="#832EC5" weight={3} />

                    {/* Tangent Line */}
                    <Plot.OfX y={tangent} color="#AB5DDC" opacity={0.6} />

                    {point.element}
                </Mafs>
            </div>
        </div>
    );
};
