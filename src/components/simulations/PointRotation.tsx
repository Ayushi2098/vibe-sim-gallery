import { Mafs, Coordinates, Polygon, Line, useMovablePoint, Text } from "mafs";
import { useState } from "react";
import { Latex } from '../Latex';
import 'mafs/core.css';

export function PointRotation() {
    const [angle, setAngle] = useState(90); // Degrees

    // Center of rotation
    const centerPoint = useMovablePoint([0, 0], { color: "#9333ea" });

    // Original shape vertices (Triangle)
    const vertices = [
        [2, 0],
        [4, 1],
        [3, 3]
    ] as [number, number][];

    const labels = ["A", "B", "C"];

    // Rotation logic
    // Rotate point p around center c by angle theta
    const rotatePoint = (p: [number, number], center: [number, number], thetaDeg: number): [number, number] => {
        const theta = thetaDeg * Math.PI / 180;
        const [x, y] = p;
        const [cx, cy] = center;
        const dx = x - cx;
        const dy = y - cy;

        return [
            cx + dx * Math.cos(theta) - dy * Math.sin(theta),
            cy + dx * Math.sin(theta) + dy * Math.cos(theta)
        ];
    };

    const rotatedVertices = vertices.map(v => rotatePoint(v, centerPoint.point, angle));

    return (
        <div className="flex flex-col gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="text-gray-600 mb-4">
                    Drag the purple center point and adjust the rotation angle.
                </div>

                <div className="flex items-center gap-4 mb-4">
                    <label className="font-semibold text-gray-700 min-w-24">Angle: <Latex>{`\\theta = ${angle}^{\\circ}`}</Latex></label>
                    <input
                        type="range"
                        min="-360"
                        max="360"
                        step="15" // Step by 15 deg for easier "nice" angles
                        value={angle}
                        onChange={(e) => setAngle(Number(e.target.value))}
                        className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                    />
                </div>
            </div>

            <Mafs height={500} viewBox={{ x: [-8, 8], y: [-8, 8] }}>
                <Coordinates.Cartesian />

                {/* Construction Lines (Rays from center to new points) */}
                {vertices.map((_, i) => (
                    <Line.Segment
                        key={`line-${i}`}
                        point1={centerPoint.point}
                        point2={rotatedVertices[i]}
                        color="#9333ea"
                        opacity={0.3}
                        style="dashed"
                    />
                ))}
                {/* Original Lines to center */}
                {vertices.map((v, i) => (
                    <Line.Segment
                        key={`orig-line-${i}`}
                        point1={centerPoint.point}
                        point2={v}
                        color="#AB5DDC"
                        opacity={0.3}
                        style="dashed"
                    />
                ))}

                {/* Original Shape */}
                <Polygon
                    points={vertices}
                    color="#AB5DDC"
                    weight={2}
                />
                {vertices.map((v, i) => (
                    <Text key={'orig' + i} x={v[0]} y={v[1]} attach="s" size={15} color="#AB5DDC">{labels[i]}</Text>
                ))}

                {/* Rotated Shape */}
                <Polygon
                    points={rotatedVertices}
                    color="#9333ea"
                    fillOpacity={0.2}
                    weight={2}
                />
                {rotatedVertices.map((v, i) => (
                    <Text key={'rot' + i} x={v[0]} y={v[1]} attach="n" size={15} color="#9333ea">{labels[i] + "'"}</Text>
                ))}

                {/* Center of Rotation */}
                {centerPoint.element}
                <Text x={centerPoint.x} y={centerPoint.y - 0.5} attach="n" color="#9333ea">Center</Text>

            </Mafs>
        </div>
    );
}
