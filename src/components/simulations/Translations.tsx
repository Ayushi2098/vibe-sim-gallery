import { Mafs, Coordinates, Polygon, Vector, useMovablePoint, Transform, Text } from "mafs";
import { useState, useMemo } from "react";
import { Latex } from '../Latex';
import 'mafs/core.css';

export function Translations() {
    // Starting position of the shape centroid or a reference point

    // Vector control point - drags the shape
    const translatePoint = useMovablePoint([0, 0], {
        color: "#AB5DDC",
    });

    // Define a shape (e.g., a triangle) centered at origin
    const shape = [
        [0, 1],
        [-1, -1],
        [1, -1],
    ] as [number, number][];

    // Target translation to match
    // Let's randomize it or have a fixed target? A fixed target is good for "Match transformation rules".
    // Or maybe just a toggle to show/hide target for a challenge.
    const [target, setTarget] = useState<[number, number]>([3, 2]);
    const [score, setScore] = useState(0);
    const [showHint, setShowHint] = useState(true);

    const isMatched = useMemo(() => {
        const dx = Math.abs(translatePoint.x - target[0]);
        const dy = Math.abs(translatePoint.y - target[1]);
        return dx < 0.3 && dy < 0.3;
    }, [translatePoint.x, translatePoint.y, target]);

    const handleNewTarget = () => {
        const tx = Math.floor(Math.random() * 6) - 3; // -3 to 3
        const ty = Math.floor(Math.random() * 6) - 3;
        setTarget([tx, ty]);
        translatePoint.setPoint([0, 0]);
        if (isMatched) setScore(s => s + 1); // Only increment if they solved the previous
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-lg">Translate the blue triangle</span>
                    <span className="text-green-600 font-bold">Matches: {score}</span>
                </div>
                <div className="text-gray-600 mb-2">
                    Match the target rule:
                    <span className="font-mono bg-gray-100 px-2 py-1 rounded ml-2">
                        <Latex>{`(x, y) \\to (x ${target[0] >= 0 ? '+' : ''}${target[0]}, y ${target[1] >= 0 ? '+' : ''}${target[1]})`}</Latex>
                    </span>
                </div>
                <div className="text-sm text-gray-500">
                    Current Translation: <Latex>{`(${Math.round(translatePoint.x)}, ${Math.round(translatePoint.y)})`}</Latex>
                </div>
            </div>

            <Mafs height={500} viewBox={{ x: [-5, 5], y: [-5, 5] }}>
                <Coordinates.Cartesian />

                {/* Target Shape (Ghost) */}
                <Transform translate={target}>
                    <Polygon points={shape} color="rgba(0,0,0,0.2)" strokeStyle="dashed" weight={2} />
                    <Text x={0} y={1.5} attach="n">Target</Text>
                </Transform>

                {/* Interactive Shape */}
                <Transform translate={[translatePoint.x, translatePoint.y]}>
                    <Polygon
                        points={shape}
                        color="#832EC5"
                        weight={2}
                    />
                    {/* Drag handle at the centroid or near it */}
                    {/* We use the movable point as the handle, effectively */}
                </Transform>

                {/* Vector visualization */}
                {showHint && (
                    <Vector
                        tail={[0, 0]}
                        tip={[translatePoint.x, translatePoint.y]}
                        color="#832EC5"
                    />
                )}

                {translatePoint.element}

            </Mafs>

            <div className="flex justify-center gap-4">
                <button
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition shadow-md"
                    onClick={handleNewTarget}
                >
                    {isMatched ? "Next Challenge" : "Skip Challenge"}
                </button>
                <button
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
                    onClick={() => setShowHint(!showHint)}
                >
                    {showHint ? "Hide Vector" : "Show Vector"}
                </button>
            </div>
        </div>
    );
}
