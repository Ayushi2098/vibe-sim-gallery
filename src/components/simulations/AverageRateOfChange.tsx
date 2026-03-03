import React from 'react';
import { Mafs, Coordinates, Plot, useMovablePoint, Line } from 'mafs';
import { Latex } from '../Latex';
import 'mafs/core.css';

export const AverageRateOfChange: React.FC = () => {
    // Function: y = x^2/4
    const func = (x: number) => (x * x) / 4;

    const point1 = useMovablePoint([-2, 1], {
        constrain: (p) => [p[0], func(p[0])],
        color: '#832EC5'
    });

    const point2 = useMovablePoint([2, 1], {
        constrain: (p) => [p[0], func(p[0])],
        color: '#832EC5'
    });

    const x1 = point1.x;
    const y1 = point1.y;
    const x2 = point2.x;
    const y2 = point2.y;

    const slope = (y2 - y1) / (x2 - x1);

    return (
        <div style={{ padding: '4px' }}>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
                <div style={{ fontSize: '1.1em', marginBottom: '10px' }}>
                    Function: <Latex>{`f(x) = \\frac{x^2}{4}`}</Latex>
                </div>
                <div style={{ fontSize: '1.2em' }}>
                    Slope (Secant): <Latex>{`m = \\frac{y_2 - y_1}{x_2 - x_1} = \\frac{${y2.toFixed(1)} - ${y1.toFixed(1)}}{${x2.toFixed(1)} - (${x1.toFixed(1)})} = ${isNaN(slope) ? 'NaN' : slope.toFixed(2)}`}</Latex>
                </div>
            </div>

            <div style={{ height: '800px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', overflow: 'hidden', background: '#0a0a0a' }}>
                <Mafs viewBox={{ x: [-5, 5], y: [-2, 8] }} preserveAspectRatio={false} pan={false} zoom={false}>
                    <Coordinates.Cartesian />
                    <Plot.OfX y={func} color="#832EC5" weight={3} />
                    {Math.abs(x1 - x2) > 0.001 && (
                        <Line.ThroughPoints point1={[x1, y1]} point2={[x2, y2]} color="#AB5DDC" />
                    )}
                    {point1.element}
                    {point2.element}
                </Mafs>
            </div>
        </div>
    );
};
