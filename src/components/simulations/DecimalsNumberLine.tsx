import React from 'react';
import { useMovablePoint, Line, LaTeX } from 'mafs';
import { SimulationContainer } from './SimulationContainer';

export const DecimalsNumberLine: React.FC = () => {
    // Leftmost point gets Primary (Purple)
    const pointC = useMovablePoint([-2.3, 0], { color: '#832EC5' }); // Primary
    const pointA = useMovablePoint([1.5, 0], { color: '#AB5DDC' });  // Secondary
    const pointB = useMovablePoint([3.7, 0], { color: '#F3D5FC' });  // Light purple

    const points = [
        { label: 'C', point: pointC, color: '#832EC5' },
        { label: 'A', point: pointA, color: '#AB5DDC' },
        { label: 'B', point: pointB, color: '#F3D5FC' },
    ];

    return (
        <SimulationContainer
            title="Decimals on the Number Line"
            viewBox={{ x: [-5, 5], y: [-1.2, 1.2] }}
            preserveAspectRatio={false}
        >
            {/* Number line */}
            <Line.Segment point1={[-5, 0]} point2={[5, 0]} color="#94a3b8" />

            {/* Major tick marks */}
            {Array.from({ length: 11 }, (_, i) => i - 5).map(n => {
                const activePoint = points.find(p => Math.abs(p.point.x - n) < 0.1);
                const color = activePoint ? activePoint.color : "#94a3b8";
                const labelColor = activePoint ? activePoint.color : "#f8fafc";

                return (
                    <React.Fragment key={n}>
                        <Line.Segment
                            point1={[n, -0.15]}
                            point2={[n, 0.15]}
                            color={color}
                            weight={activePoint ? 3 : 1}
                        />
                        <LaTeX
                            at={[n, -0.5]}
                            tex={n.toString()}
                            color={labelColor}
                        />
                    </React.Fragment>
                );
            })}

            {/* Minor tick marks (0.5 intervals) */}
            {Array.from({ length: 20 }, (_, i) => i - 9).map(n => (
                <Line.Segment key={`half-${n}`} point1={[n * 0.5, -0.08]} point2={[n * 0.5, 0.08]} color="rgba(255,255,255,0.2)" />
            ))}

            {/* Movable Points */}
            {pointC.element}
            {pointA.element}
            {pointB.element}

            {/* Labels and values */}
            {points.map(({ label, point, color }) => (
                <React.Fragment key={label}>
                    <LaTeX at={[point.x, 0.6]} tex={`\\text{${label}}`} color={color} />
                    <LaTeX at={[point.x, 0.9]} tex={point.x.toFixed(2)} color={color} />
                </React.Fragment>
            ))}
        </SimulationContainer>
    );
};
