import React, { useState } from 'react';
import { Mafs, Coordinates, useMovablePoint, LaTeX, Plot, Point } from 'mafs';

import 'mafs/core.css';

export const HorizontalLineTest: React.FC = () => {
    const [curveType, setCurveType] = useState<'one-to-one' | 'many-to-one'>('many-to-one');
    const hLine = useMovablePoint([0, 2], {
        constrain: ([, y]) => [0, y],
        color: '#FFC700'
    });

    // One-to-one: y = x^3 / 4
    // Many-to-one: y = x^2 / 4 => x = +/- 2*sqrt(y)

    let intersections: [number, number][] = [];
    if (curveType === 'one-to-one') {
        const y = hLine.y;
        const x = y >= 0 ? Math.pow(4 * y, 1 / 3) : -Math.pow(-4 * y, 1 / 3);
        intersections = [[x, y]];
    } else {
        if (hLine.y >= 0) {
            const x = 2 * Math.sqrt(hLine.y);
            if (x === 0) {
                intersections = [[0, hLine.y]];
            } else {
                intersections = [[x, hLine.y], [-x, hLine.y]];
            }
        }
    }

    const isOneToOne = intersections.length <= 1;

    return (
        <div style={{ padding: '4px' }}>


            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                            onClick={() => setCurveType('one-to-one')}
                            style={{
                                padding: '8px 16px',
                                background: curveType === 'one-to-one' ? '#832EC5' : '#1a1a1a',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            Cubic (One-to-one)
                        </button>
                        <button
                            onClick={() => setCurveType('many-to-one')}
                            style={{
                                padding: '8px 16px',
                                background: curveType === 'many-to-one' ? '#832EC5' : '#1a1a1a',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            Parabola (Many-to-one)
                        </button>
                    </div>
                    <div>
                        <span style={{ color: '#832EC5', fontWeight: 'bold', fontSize: '1.2em', opacity: isOneToOne ? 1 : 0.5 }}>
                            {isOneToOne ? 'One-to-one' : 'Many-to-one'}
                        </span>
                    </div>
                </div>
            </div>

            <div style={{ height: '800px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', overflow: 'hidden', background: '#0a0a0a' }}>
                <Mafs height={800} viewBox={{ x: [-5, 5], y: [-5, 5] }}>
                    <Coordinates.Cartesian />

                    {curveType === 'one-to-one' ? (
                        <Plot.OfX y={(x) => (x * x * x) / 4} color="#832EC5" />
                    ) : (
                        <Plot.OfX y={(x) => (x * x) / 4} color="#832EC5" />
                    )}

                    <Plot.OfX y={() => hLine.y} color="#FFC700" weight={2} />

                    {intersections.map((p, i) => (
                        <Point key={i} x={p[0]} y={p[1]} color="#832EC5" />
                    ))}

                    <LaTeX at={[hLine.x - 0.5, hLine.y + 0.3]} tex={`y = ${hLine.y.toFixed(1)}`} color="#FFC700" />
                    {hLine.element}
                </Mafs>
            </div>
        </div>
    );
};
