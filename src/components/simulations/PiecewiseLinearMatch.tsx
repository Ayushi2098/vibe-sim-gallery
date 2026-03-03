import React from 'react';
import { Coordinates, Plot, Point, useMovablePoint } from 'mafs';
import { Latex } from '../Latex';
import { SimulationContainer } from './SimulationContainer';

export const PiecewiseLinearMatch: React.FC = () => {
    // Description: f(x) = { -x + 2 for x < 0;  2 for x >= 0 }

    const boundary = 0;

    // Left segment point (Leftmost -> Purple)
    const point1 = useMovablePoint([-2, 0], {
        color: '#832EC5',
        constrain: ([px, py]) => [Math.min(px, boundary - 0.1), py]
    });

    // Junction point (Middle -> Blue)
    const point2 = useMovablePoint([0, 2], {
        color: '#AB5DDC',
        constrain: ([, py]) => [boundary, py]
    });

    // Right segment point (Rightmost -> Green)
    const point3 = useMovablePoint([3, 2], {
        color: '#832EC5',
        constrain: ([x, y]) => [Math.max(x, boundary + 0.1), y]
    });

    // Target check
    // Target: Left passing (-2, 4) -> y = -x + 2. Right horizontal y = 2.
    const isCorrect =
        Math.abs(point1.x - (-2)) < 0.2 && Math.abs(point1.y - 4) < 0.2 &&
        Math.abs(point2.y - 2) < 0.2 &&
        Math.abs(point3.y - 2) < 0.2;

    return (
        <SimulationContainer
            title="Matching Piecewise Linear Functions"
            tooltip="Adjust the graph points to match the function definition above."
            subtitle={
                <div style={{ fontSize: '1.2em', fontFamily: 'monospace' }}>
                    <Latex>{`f(x) = \\begin{cases} -x + 2 & x < 0 \\\\ 2 & x \\ge 0 \\end{cases}`}</Latex>
                </div>
            }
            infoPanel={
                isCorrect ? (
                    <div style={{ color: '#832EC5', fontWeight: 'bold', textAlign: 'center' }}>
                        <Latex>{"\\text{Matches! Correct Graph.}"}</Latex>
                    </div>
                ) : (
                    <div style={{ color: '#94a3b8', textAlign: 'center' }}>
                        Keep adjusting...
                    </div>
                )
            }
            viewBox={{ x: [-5, 5], y: [-2, 6] }}
            preserveAspectRatio={false}
        >
            <Coordinates.Cartesian />

            {/* Left Segment: From infinity to junction */}
            <Plot.OfX
                y={(x) => {
                    const m = (point2.y - point1.y) / (point2.x - point1.x);
                    const c = point1.y - m * point1.x;
                    return m * x + c;
                }}
                domain={[-10, boundary]}
                color="#832EC5"
                weight={3}
            />

            {/* Right Segment: From junction to infinity */}
            <Plot.OfX
                y={(x) => {
                    const m = (point3.y - point2.y) / (point3.x - point2.x);
                    const c = point2.y - m * point2.x;
                    return m * x + c;
                }}
                domain={[boundary, 10]}
                color="#AB5DDC"
                weight={3}
            />

            {/* Open/Closed circle at boundary */}
            <Point x={boundary} y={point2.y} color="#832EC5" />

            {point1.element}
            {point2.element}
            {point3.element}
        </SimulationContainer>
    );
};
