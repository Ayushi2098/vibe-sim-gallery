import { Mafs, Coordinates, Polygon, Line, Text } from "mafs";
import { useState } from "react";
import { Latex } from '../Latex';

import "katex/dist/katex.min.css";
import 'mafs/core.css';

export function AxisReflections() {
    const [axis, setAxis] = useState<'x' | 'y'>('x');

    // Original shape vertices (Triangle)
    // Place it in Q1 initially
    const vertices = [
        [1, 2],
        [4, 1],
        [2, 5]
    ] as [number, number][];

    const labels = ["A", "B", "C"];

    const reflect = (p: [number, number], mode: 'x' | 'y'): [number, number] => {
        const [x, y] = p;
        if (mode === 'x') return [x, -y];
        return [-x, y];
    };

    const reflectedVertices = vertices.map(v => reflect(v, axis));

    return (
        <div className="flex flex-col gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">

                <div className="flex justify-between items-center mb-4">
                    <div className="flex bg-gray-100 rounded-lg p-1">
                        <button
                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${axis === 'x' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                            onClick={() => setAxis('x')}
                        >
                            Reflect across X-axis
                        </button>
                        <button
                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${axis === 'y' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                            onClick={() => setAxis('y')}
                        >
                            Reflect across Y-axis
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <h4 className="font-semibold text-gray-700 border-b pb-1">Transformation Rule</h4>
                        <div className="text-center py-2 bg-blue-50 rounded text-blue-800">
                            <Latex>{axis === 'x' ? '(x, y) \\to (x, -y)' : '(x, y) \\to (-x, y)'}</Latex>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h4 className="font-semibold text-gray-700 border-b pb-1">Coordinate Mapping</h4>
                        <div className="text-sm space-y-1">
                            {vertices.map((v, i) => (
                                <div key={i} className="flex justify-between items-center px-2">
                                    <Latex>{`(${v[0]}, ${v[1]})`}</Latex>
                                    <Latex>\to</Latex>
                                    <span className="text-red-600">
                                        <Latex>{`(${reflectedVertices[i][0]}, ${reflectedVertices[i][1]})`}</Latex>
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <Mafs height={500} viewBox={{ x: [-8, 8], y: [-8, 8] }}>
                <Coordinates.Cartesian />

                {/* Axis Highlight */}
                {axis === 'x' ? (
                    <Line.ThroughPoints point1={[-10, 0]} point2={[10, 0]} color="#832EC5" weight={3} opacity={0.5} />
                ) : (
                    <Line.ThroughPoints point1={[0, -10]} point2={[0, 10]} color="#832EC5" weight={3} opacity={0.5} />
                )}

                {/* Original Shape */}
                <Polygon
                    points={vertices}
                    color="#AB5DDC"
                    weight={2}
                />
                {vertices.map((v, i) => (
                    <Text key={'orig' + i} x={v[0]} y={v[1]} attach={v[1] > 0 ? "s" : "n"} size={20} color="#AB5DDC">{labels[i]}</Text>
                ))}

                {/* Reflected Shape */}
                <Polygon
                    points={reflectedVertices}
                    fillOpacity={0.2}
                    weight={2}
                    color="#AB5DDC"
                />
                {reflectedVertices.map((v, i) => (
                    <Text key={'ref' + i} x={v[0]} y={v[1]} attach={v[1] > 0 ? "s" : "n"} size={20} color="#AB5DDC">{labels[i] + "'"}</Text>
                ))}

            </Mafs>
        </div>
    );
}
