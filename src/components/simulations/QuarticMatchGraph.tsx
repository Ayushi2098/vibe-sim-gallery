import React, { useState, useEffect } from 'react';
import { Mafs, Coordinates, Plot, useMovablePoint } from 'mafs';
import { Latex } from '../Latex';
import 'mafs/core.css';

export const QuarticMatchGraph: React.FC = () => {
    // Target:
    const [targetR1, setTargetR1] = useState(-2);
    const [targetR2, setTargetR2] = useState(-1);
    const [targetR3, setTargetR3] = useState(1);
    const [targetR4, setTargetR4] = useState(2);

    // User Controls (Movable Points on X-Axis for roots)
    const p1 = useMovablePoint([-4, 0], { constrain: ([x]) => [x, 0], color: '#AB5DDC' });
    const p2 = useMovablePoint([-3, 0], { constrain: ([x]) => [x, 0], color: '#AB5DDC' });
    const p3 = useMovablePoint([3, 0], { constrain: ([x]) => [x, 0], color: '#AB5DDC' });
    const p4 = useMovablePoint([4, 0], { constrain: ([x]) => [x, 0], color: '#AB5DDC' });

    // Scaling factor 'a'
    const scale = 0.2;

    const [isMatched, setIsMatched] = useState(false);

    // Auto-check effect
    useEffect(() => {
        const userRoots = [p1.x, p2.x, p3.x, p4.x].sort((a, b) => a - b);
        const targetRoots = [targetR1, targetR2, targetR3, targetR4].sort((a, b) => a - b);

        const matched = userRoots.every((r, i) => Math.abs(r - targetRoots[i]) < 0.3);
        setIsMatched(matched);
    }, [p1.x, p2.x, p3.x, p4.x, targetR1, targetR2, targetR3, targetR4]);

    const generateNewTarget = () => {
        const roots = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) - 3);
        setTargetR1(roots[0]);
        setTargetR2(roots[1]);
        setTargetR3(roots[2]);
        setTargetR4(roots[3]);
        p1.setPoint([-4, 0]);
        p2.setPoint([-3, 0]);
        p3.setPoint([3, 0]);
        p4.setPoint([4, 0]);
    };

    return (
        <div style={{ padding: '4px', color: '#f8fafc' }}>
            <div style={{ marginBottom: '10px', background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
                <div style={{ flex: '1', marginRight: '20px' }}>
                    <div style={{ fontSize: '1em', fontFamily: 'monospace', color: '#832EC5', opacity: isMatched ? 1 : 0.7, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        <Latex>
                            {`y = 0.2(x ${targetR1 >= 0 ? '-' : '+'} ${Math.abs(targetR1)})
                             (x ${targetR2 >= 0 ? '-' : '+'} ${Math.abs(targetR2)})
                             (x ${targetR3 >= 0 ? '-' : '+'} ${Math.abs(targetR3)})
                             (x ${targetR4 >= 0 ? '-' : '+'} ${Math.abs(targetR4)})`}
                        </Latex>
                    </div>
                </div>
            </div>

            <div style={{ height: '800px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', overflow: 'hidden', background: '#0f172a' }}>
                <Mafs
                    height={800}
                    viewBox={{ x: [-5, 5], y: [-5, 5] }}
                    preserveAspectRatio={false}
                >
                    <Coordinates.Cartesian />

                    {/* Target Graph (Dashed) */}
                    <Plot.OfX
                        y={(x) => scale * (x - targetR1) * (x - targetR2) * (x - targetR3) * (x - targetR4)}
                        style="dashed"
                        color="#832EC5"
                        opacity={0.5}
                    />

                    {/* User Graph */}
                    <Plot.OfX
                        y={(x) => scale * (x - p1.x) * (x - p2.x) * (x - p3.x) * (x - p4.x)}
                        color={isMatched ? "#22c55e" : "#AB5DDC"}
                        weight={3}
                    />

                    {/* User Points */}
                    {p1.element}
                    {p2.element}
                    {p3.element}
                    {p4.element}

                </Mafs>
                {isMatched && (
                    <div style={{
                        position: 'absolute',
                        top: '20px',
                        right: '20px',
                        padding: '8px 16px',
                        background: 'rgba(34, 197, 94, 0.9)',
                        color: 'white',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                        Matched!
                    </div>
                )}
            </div>
        </div>
    );
};
