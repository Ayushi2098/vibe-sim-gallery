import React from 'react';
import { useMovablePoint, Line, LaTeX } from 'mafs';
import { SimulationContainer } from './SimulationContainer';

export const PlacingNumbersNumberLine: React.FC = () => {
    // Current points: A(2.5), B(-1.8), C(4.3), D(-3.5)
    // Leftmost is D, then B, then A, then C
    // Order: D (Purple), B (Blue), A (Green), C (Orange)

    const pointD = useMovablePoint([-3.5, 0], { color: '#832EC5' }); // Primary purple
    const pointB = useMovablePoint([-1.8, 0], { color: '#AB5DDC' }); // Light purple
    const pointA = useMovablePoint([2.5, 0], { color: '#F3D5FC' });  // Lightest purple
    const pointC = useMovablePoint([4.3, 0], { color: 'rgba(255,255,255,0.7)' });  // White

    const roundedPoints = [
        { label: 'D', point: pointD, color: '#832EC5' },
        { label: 'B', point: pointB, color: '#AB5DDC' },
        { label: 'A', point: pointA, color: '#F3D5FC' },
        { label: 'C', point: pointC, color: 'rgba(255,255,255,0.7)' }
    ];

    return (
        <SimulationContainer
            title="Placing Numbers on the Number Line"
            tooltip="Drag the points to place them at different positions on the number line."
            viewBox={{ x: [-6, 6], y: [-1.5, 1.5] }}
            preserveAspectRatio={false}
        >
            {/* Number line */}
            <Line.Segment point1={[-6, 0]} point2={[6, 0]} color="#94a3b8" />

            {/* Major tick marks */}
            {Array.from({ length: 13 }, (_, i) => i - 6).map(n => {
                const activePoint = roundedPoints.find(p => Math.abs(p.point.x - n) < 0.1);
                const color = activePoint ? activePoint.color : "#94a3b8";
                const labelColor = activePoint ? activePoint.color : "#f8fafc";

                return (
                    <React.Fragment key={n}>
                        <Line.Segment
                            point1={[n, -0.2]}
                            point2={[n, 0.2]}
                            color={color}
                            weight={activePoint ? 3 : 1}
                        />
                        <LaTeX
                            at={[n, -0.6]}
                            tex={n.toString()}
                            color={labelColor}
                        />
                    </React.Fragment>
                );
            })}

            {/* Minor tick marks (0.5 intervals) */}
            {Array.from({ length: 24 }, (_, i) => (i - 11) * 0.5 - 0.5).map(n => {
                if (Number.isInteger(n)) return null;
                return (
                    <Line.Segment key={`half-${n}`} point1={[n, -0.1]} point2={[n, 0.1]} color="rgba(255,255,255,0.2)" />
                );
            })}

            {/* Movable Points */}
            {pointD.element}
            {pointB.element}
            {pointA.element}
            {pointC.element}

            {/* Labels and values */}
            {roundedPoints.map(({ label, point, color }) => (
                <React.Fragment key={label}>
                    <LaTeX at={[point.x, 0.7]} tex={`\\text{${label}}`} color={color} />
                    <LaTeX at={[point.x, 1.1]} tex={point.x.toFixed(1)} color={color} />
                </React.Fragment>
            ))}
        </SimulationContainer>
    );
};
