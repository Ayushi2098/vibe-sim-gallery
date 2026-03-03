import React from 'react';
import { Mafs, Coordinates, useMovablePoint, LaTeX, Plot } from 'mafs';

import 'mafs/core.css';

export const CartesianRelations: React.FC = () => {
    // 5 draggable points
    const p1 = useMovablePoint([-2, 2], { color: '#832EC5' });
    const p2 = useMovablePoint([0, 1], { color: '#832EC5' });
    const p3 = useMovablePoint([2, -1], { color: '#832EC5' });
    const p4 = useMovablePoint([-1, -2], { color: '#832EC5' });
    const p5 = useMovablePoint([1, 0], { color: '#832EC5' });

    const points = [p1, p2, p3, p4, p5];

    // Snap points to 0.5 increments for easier matching
    const xCoords = points.map(p => Math.round(p.x * 2) / 2);
    const duplicates = xCoords.filter((x, index) => xCoords.indexOf(x) !== index);
    const uniqueDuplicates = [...new Set(duplicates)];

    const isFunction = duplicates.length === 0;

    return (
        <div style={{ padding: '4px' }}>


            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
                <div style={{ fontSize: '1.2em', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>
                        Relation Status: {' '}
                        <span style={{ color: '#832EC5', fontWeight: 'bold', opacity: isFunction ? 1 : 0.5 }}>
                            {isFunction ? 'Function' : 'Not a Function'}
                        </span>
                    </span>
                    <div style={{ fontSize: '0.8em', color: '#94a3b8' }}>
                        Snap: 0.5
                    </div>
                </div>
                {!isFunction && (
                    <div style={{ marginTop: '8px', fontSize: '0.95em', color: '#f8fafc', background: 'rgba(171, 93, 220, 0.1)', padding: '8px', borderRadius: '4px', border: '1px solid rgba(171, 93, 220, 0.2)' }}>
                        <span style={{ color: '#AB5DDC', fontWeight: 'bold' }}>Violation:</span> Multiple y-values found for x = {'{'}{uniqueDuplicates.join(', ')}{'}'}.
                    </div>
                )}
            </div>

            <div style={{ height: '800px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', overflow: 'hidden', background: '#0a0a0a' }}>
                <Mafs height={800} viewBox={{ x: [-5, 5], y: [-5, 5] }}>
                    <Coordinates.Cartesian />

                    {/* Visual indicators for vertical line test failure */}
                    {uniqueDuplicates.map((x, i) => (
                        <Plot.OfY key={`fail-${i}`} x={() => x} color="#f97316" style="dashed" />
                    ))}

                    {points.map((p, i) => (
                        <React.Fragment key={i}>
                            {/* Snap logic: user drags freely, but we show snapped labels and use snapped logic */}
                            {p.element}
                            <LaTeX
                                at={[p.x, p.y + 0.5]}
                                tex={`P_{${i + 1}}(${p.x.toFixed(1)}, ${p.y.toFixed(1)})`}
                                color={uniqueDuplicates.includes(Math.round(p.x * 2) / 2) ? "#f97316" : "#832EC5"}
                            />
                        </React.Fragment>
                    ))}
                </Mafs>
            </div>
        </div>
    );
};
