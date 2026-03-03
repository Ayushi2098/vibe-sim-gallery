import React, { useState } from 'react';
import { Mafs, Coordinates, useMovablePoint, Point, LaTeX } from 'mafs';
import { Latex } from '../Latex';

import 'mafs/core.css';

export const PlottingPoints: React.FC = () => {
    // ...
    // Random target point (memoized so it doesn't change on every render)
    const [target] = useState(() => ({
        x: Math.floor(Math.random() * 8) - 4,
        y: Math.floor(Math.random() * 8) - 4
    }));

    const point = useMovablePoint([0, 0], { color: '#832EC5' });

    const isCorrect = Math.abs(point.x - target.x) < 0.1 && Math.abs(point.y - target.y) < 0.1;

    return (
        <div style={{ padding: '4px' }}>


            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '8px', marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <div style={{ fontSize: '1.2em', fontFamily: 'monospace', marginBottom: '5px' }}>
                        Target: <span style={{ color: '#AB5DDC' }}><Latex>{`(${target.x}, ${target.y})`}</Latex></span>
                    </div>
                    <div style={{ fontSize: '1.2em', fontFamily: 'monospace' }}>
                        Current: <span style={{ color: '#832EC5' }}><Latex>{`(${point.x.toFixed(1)}, ${point.y.toFixed(1)})`}</Latex></span>
                    </div>
                </div>
                {isCorrect && (
                    <div style={{ color: '#832EC5', fontWeight: 'bold' }}>
                        <Latex>{"\\text{Correct! You found the point.}"}</Latex>
                    </div>
                )}
            </div>

            <div style={{ height: '800px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', overflow: 'hidden', background: '#0a0a0a' }}>
                <Mafs height={800}>
                    <Coordinates.Cartesian />
                    <Point x={target.x} y={target.y} color="#AB5DDC" opacity={0.5} />
                    <LaTeX at={[target.x + 0.3, target.y + 0.3]} tex="\text{Target}" color="#AB5DDC" />
                    {point.element}
                    <LaTeX at={[point.x, point.y - 0.5]} tex={`(${point.x.toFixed(1)}, ${point.y.toFixed(1)})`} color="#832EC5" />
                </Mafs>
            </div>
        </div>
    );
};
