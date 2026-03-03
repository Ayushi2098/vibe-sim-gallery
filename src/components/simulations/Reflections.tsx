import { Mafs, Coordinates, Polygon, Line, useMovablePoint, Text } from "mafs";
import { Latex } from '../Latex';
import 'mafs/core.css';

export function Reflections() {
    // Shape vertices (Triangle)
    const vertices = [
        [1, 2],
        [3, 4],
        [4, 1]
    ] as [number, number][];

    const labels = ["A", "B", "C"];

    // Reflection Line defined by two points
    // Let's start with x-axis or y-axis or y=x to make it "nice" initially
    const point1 = useMovablePoint([0, 0], { color: "#832EC5" });
    const point2 = useMovablePoint([4, 4], { color: "#832EC5" });

    // Reflection logic
    // General reflection formula across line through (x1,y1) and (x2,y2)
    const reflectPoint = (p: [number, number], p1: [number, number], p2: [number, number]): [number, number] => {
        const [x, y] = p;
        const [x1, y1] = p1;
        const [x2, y2] = p2;

        if (x1 === x2 && y1 === y2) return [x, y]; // Points coincide, no line

        const dx = x2 - x1;
        const dy = y2 - y1;

        const a = (dx * dx - dy * dy) / (dx * dx + dy * dy);
        const b = (2 * dx * dy) / (dx * dx + dy * dy);

        const x_new = a * (x - x1) + b * (y - y1) + x1;
        const y_new = b * (x - x1) - a * (y - y1) + y1;

        return [x_new, y_new];
    };

    const reflectedVertices = vertices.map(v => reflectPoint(v, point1.point, point2.point));

    return (
        <div className="flex flex-col gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="text-gray-600 mb-4">
                    Drag the red points to move the line of reflection. Observe how the coordinates change.
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h4 className="font-semibold text-blue-600 mb-1">Original (Blue)</h4>
                        <ul className="text-sm space-y-1">
                            {vertices.map((v, i) => (
                                <li key={i} className="flex justify-between">
                                    <Latex>{labels[i]}</Latex>
                                    <Latex>{`(${v[0].toFixed(1)}, ${v[1].toFixed(1)})`}</Latex>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-red-600 mb-1">Reflected (Red)</h4>
                        <ul className="text-sm space-y-1">
                            {reflectedVertices.map((v, i) => (
                                <li key={i} className="flex justify-between">
                                    <Latex>{labels[i] + "'"}</Latex>
                                    <Latex>{`(${v[0].toFixed(1)}, ${v[1].toFixed(1)})`}</Latex>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <Mafs height={500} viewBox={{ x: [-8, 8], y: [-5, 8] }}>
                <Coordinates.Cartesian />

                {/* Reflection Line */}
                <Line.ThroughPoints
                    point1={point1.point}
                    point2={point2.point}
                    color="#832EC5"
                />
                {point1.element}
                {point2.element}

                {/* Original Shape */}
                <Polygon
                    points={vertices}
                    color="#AB5DDC"
                    weight={2}
                />
                {vertices.map((v, i) => (
                    <Text key={i} x={v[0]} y={v[1]} attach="s" size={20} color="#AB5DDC">{labels[i]}</Text>
                ))}

                {/* Reflected Shape */}
                <Polygon
                    points={reflectedVertices}
                    color="#ef4444"
                    fillOpacity={0.2}
                    weight={2}
                    strokeStyle="dashed"
                />
                {reflectedVertices.map((v, i) => (
                    <Text key={i} x={v[0]} y={v[1]} attach="n" size={20} color="#ef4444">{labels[i] + "'"}</Text>
                ))}

            </Mafs>
        </div>
    );
}
