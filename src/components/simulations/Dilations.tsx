import { Mafs, Coordinates, Polygon, Line, useMovablePoint, Text } from "mafs";
import { useState } from "react";
import { Latex } from '../Latex';

import 'mafs/core.css';

export function Dilations() {
    const [scale, setScale] = useState(2);

    // Center of dilation
    const centerPoint = useMovablePoint([-3, -2], { color: "#9333ea" }); // Purple for center

    // Original shape vertices (Triangle)
    const vertices = [
        [0, 1],
        [2, 0],
        [1, 2]
    ] as [number, number][];

    const labels = ["A", "B", "C"];

    // Dilation logic
    // P' = C + k(P - C)
    const dilatePoint = (p: [number, number], center: [number, number], k: number): [number, number] => {
        const [x, y] = p;
        const [cx, cy] = center;
        return [cx + k * (x - cx), cy + k * (y - cy)];
    };

    const dilatedVertices = vertices.map(v => dilatePoint(v, centerPoint.point, scale));

    return (
        <div className="flex flex-col gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">

                <div className="text-gray-600 mb-4">
                    Drag the purple point (Center of Dilation) and adjust the scale factor.
                </div>

                <div className="flex items-center gap-4 mb-4">
                    <label className="font-semibold text-gray-700 min-w-24">Scale Factor <Latex>{`k = ${scale.toFixed(1)}`}</Latex></label>
                    <input
                        type="range"
                        min="0.1"
                        max="3"
                        step="0.1"
                        value={scale}
                        onChange={(e) => setScale(parseFloat(e.target.value))}
                        className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                    />
                </div>
            </div>

            <Mafs height={500} viewBox={{ x: [-8, 8], y: [-5, 8] }}>
                <Coordinates.Cartesian />

                {/* Construction Lines (Rays from center to new points) */}
                {vertices.map((_, i) => (
                    <Line.Segment
                        key={`line-${i}`}
                        point1={centerPoint.point}
                        point2={dilatedVertices[i]}
                        color="#9333ea"
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
                    <Text key={i} x={v[0]} y={v[1]} attach="s" size={15} color="#AB5DDC">{labels[i]}</Text>
                ))}

                {/* Dilated Shape */}
                <Polygon
                    points={dilatedVertices}
                    color="#9333ea" // Purple for transformed
                    fillOpacity={0.2}
                    weight={2}
                />
                {dilatedVertices.map((v, i) => (
                    <Text key={i} x={v[0]} y={v[1]} attach="n" size={15} color="#9333ea">{labels[i] + "'"}</Text>
                ))}

                {/* Center of Dilation */}
                {centerPoint.element}
                <Text x={centerPoint.x} y={centerPoint.y - 0.5} attach="n" color="#9333ea">Center</Text>

            </Mafs>
        </div>
    );
}
