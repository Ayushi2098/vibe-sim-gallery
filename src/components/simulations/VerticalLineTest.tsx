import React, { useState } from 'react';
import { Mafs, Coordinates, useMovablePoint, LaTeX, Plot, Point } from 'mafs';

import 'mafs/core.css';

export const VerticalLineTest: React.FC = () => {
    const [curveType, setCurveType] = useState<'function' | 'relation'>('relation');
    const vLine = useMovablePoint([1, 0], {
        constrain: ([x]) => [x, 0],
        color: '#FFC700'
    });

    // Function: y = x^2 / 2
    // Relation: x = y^2 / 2 => y = +/- sqrt(2x)

    let intersections: [number, number][] = [];
    if (curveType === 'function') {
        intersections = [[vLine.x, (vLine.x * vLine.x) / 2]];
    } else {
        if (vLine.x >= 0) {
            const y = Math.sqrt(2 * vLine.x);
            if (y === 0) {
                intersections = [[vLine.x, 0]];
            } else {
                intersections = [[vLine.x, y], [vLine.x, -y]];
            }
        }
    }

    const isFunction = intersections.length <= 1;

    return (
        <div style={{ padding: '4px' }}>


            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                            onClick={() => setCurveType('function')}
                            style={{
                                padding: '8px 16px',
                                background: curveType === 'function' ? '#832EC5' : '#1a1a1a',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            Parabola (Function)
                        </button>
                        <button
                            onClick={() => setCurveType('relation')}
                            style={{
                                padding: '8px 16px',
                                background: curveType === 'relation' ? '#832EC5' : '#1a1a1a',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            Sideways Parabola (Relation)
                        </button>
                    </div>
                    <div>
                        <span style={{ color: '#832EC5', fontWeight: 'bold', fontSize: '1.2em', opacity: isFunction ? 1 : 0.5 }}>
                            {isFunction ? 'Passes Test (Function)' : 'Fails Test (Not a Function)'}
                        </span>
                    </div>
                </div>
            </div>

            <div style={{ height: '800px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', overflow: 'hidden', background: '#0a0a0a' }}>
                <Mafs height={800} viewBox={{ x: [-5, 5], y: [-5, 5] }}>
                    <Coordinates.Cartesian />

                    {curveType === 'function' ? (
                        <Plot.OfX y={(x) => (x * x) / 2} color="#832EC5" />
                    ) : (
                        <Plot.Parametric
                            t={[-4, 4]}
                            xy={(t) => [(t * t) / 2, t]}
                            color="#832EC5"
                        />
                    )}

                    <Plot.OfY x={() => vLine.x} color="#FFC700" weight={2} />

                    {intersections.map((p, i) => (
                        <Point key={i} x={p[0]} y={p[1]} color="#832EC5" />
                    ))}

                    <LaTeX at={[vLine.x, vLine.y - 0.5]} tex={`x = ${vLine.x.toFixed(1)}`} color="#FFC700" />
                    {vLine.element}
                </Mafs>
            </div>
        </div>
    );
};
