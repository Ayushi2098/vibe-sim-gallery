import { Mafs, Coordinates, Polygon, Line, useMovablePoint, Transform } from "mafs";
import { useState } from "react";
import { Latex } from '../Latex';
import 'mafs/core.css';

export function LineRotationalSymmetry() {
    const [mode, setMode] = useState<'line' | 'rotation'>('line');
    const [rotationAngle, setRotationAngle] = useState(0);
    const [showReflection, setShowReflection] = useState(false);

    // Regular Hexagon vertices
    const radius = 3;
    const vertices: [number, number][] = [];
    for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        vertices.push([radius * Math.cos(angle), radius * Math.sin(angle)]);
    }

    // Line of symmetry handles
    // Line of symmetry handles

    // Calculate angle of the line for reflection
    // For vertical line x=0, angle is 90 deg (PI/2).
    // Actually, let's make the line freely rotatable through the center to test symmetry lines?
    // Or just a general line? The prompt says "Apply reflections... to test".
    // A common way is to have a line that can be rotated through the center.

    // Let's change the interaction: A line through the center that can be rotated.
    const symmetryLineAnglePoint = useMovablePoint([3, 0], {
        constrain: (p) => {
            const angle = Math.atan2(p[1], p[0]);
            return [3 * Math.cos(angle), 3 * Math.sin(angle)];
        }
    });

    const symmetryLineAngle = Math.atan2(symmetryLineAnglePoint.point[1], symmetryLineAnglePoint.point[0]);

    // Reflection logic
    // To visual reflection, we can draw the reflected polygon.
    // Reflect point (x,y) across line through origin with angle theta:
    // New point is result of rotation -theta, reflection across x-axis, rotation +theta.
    const reflect = (point: [number, number], angle: number): [number, number] => {
        const [x, y] = point;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        // Rotate -angle
        const x1 = x * cos + y * sin;
        const y1 = -x * sin + y * cos;
        // Reflect across x axis (y -> -y)
        const y2 = -y1;
        // Rotate +angle
        const x3 = x1 * cos - y2 * sin;
        const y3 = x1 * sin + y2 * cos;
        return [x3, y3];
    };

    const reflectedVertices = vertices.map(v => reflect(v, symmetryLineAngle));

    return (
        <div className="flex flex-col gap-4">
            <button
                className={`px-4 py-2 rounded ${mode === 'rotation' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => { setMode('rotation'); setShowReflection(false); }}
            >
                Rotational Symmetry
            </button>


            {
                mode === 'line' && (
                    <div className="text-center text-gray-600 mb-2">
                        Drag the blue point to rotate the line of symmetry. Toggle reflection to check.
                    </div>
                )
            }

            {
                mode === 'rotation' && (
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 w-full max-w-md mx-auto">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Rotation Angle: <Latex>{`\\theta = ${Math.round(rotationAngle * 180 / Math.PI)}^{\\circ}`}</Latex>
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="360"
                            value={Math.round(rotationAngle * 180 / Math.PI)}
                            onChange={(e) => setRotationAngle(Number(e.target.value) * Math.PI / 180)}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>0°</span>
                            <span>90°</span>
                            <span>180°</span>
                            <span>270°</span>
                            <span>360°</span>
                        </div>
                    </div>
                )
            }

            <Mafs height={500} viewBox={{ x: [-5, 5], y: [-5, 5] }}>
                <Coordinates.Cartesian />

                {/* Original Polygon (in background if testing reflection) */}
                <Transform rotate={mode === 'rotation' ? rotationAngle : 0}>
                    <Polygon
                        points={vertices}
                        color={mode === 'line' && showReflection ? "rgba(0,0,0,0.1)" : "#AB5DDC"}
                        weight={2}
                    />
                </Transform>

                {mode === 'line' && (
                    <>
                        {/* Line of Symmetry */}
                        <Line.ThroughPoints
                            point1={[0, 0]}
                            point2={[Math.cos(symmetryLineAngle), Math.sin(symmetryLineAngle)]}
                            color="#832EC5"
                            style="dashed"
                        />
                        {symmetryLineAnglePoint.element}

                        {/* Reflected Polygon */}
                        {showReflection && (
                            <Polygon
                                points={reflectedVertices}
                                color="#832EC5"
                                fillOpacity={0.2}
                                weight={2}
                            />
                        )}
                    </>
                )}

                {mode === 'rotation' && (
                    // Shadow polygon at 0 deg to visually compare
                    <Polygon
                        points={vertices}
                        color="rgba(0,0,0,0.1)"
                        weight={1}
                        strokeStyle="dashed"
                    />
                )}

            </Mafs>

            {
                mode === 'line' && (
                    <div className="flex justify-center">
                        <button
                            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition"
                            onClick={() => setShowReflection(!showReflection)}
                        >
                            {showReflection ? "Hide Reflection" : "Test Reflection"}
                        </button>
                    </div>
                )
            }
        </div >
    );
}
