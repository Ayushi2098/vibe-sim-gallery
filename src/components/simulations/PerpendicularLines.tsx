import React from 'react';
import { Mafs, Coordinates, Plot, useMovablePoint, Circle } from 'mafs';
import { Latex } from '../Latex';

import 'mafs/core.css';

export const PerpendicularLines: React.FC = () => {
    // Line 1 is controlled by a point P1
    const p1 = useMovablePoint([2, 2], { color: '#832EC5' });

    // Line 1 equation (passing through origin for simplicity, or just calculate slope)
    // Let's make Line 1 pass through (0,0) and P1.
    // m1 = y1/x1
    const m1 = Math.abs(p1.x) < 0.01 ? 100 : p1.y / p1.x;

    // Perpendicular slope condition: m1 * m2 = -1 => m2 = -1/m1
    const m2 = -1 / m1;

    return (
        <div style={{ padding: '4px', color: '#f8fafc' }}>
            <div style={{ marginBottom: '10px', background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '8px' }}>

                <div style={{ marginBottom: '10px' }}>
                    <div style={{ color: '#832EC5' }}>Line 1 Slope <Latex>{`(m_1): ${m1.toFixed(2)}`}</Latex></div>
                    <div style={{ color: '#FFC700' }}>Line 2 Slope <Latex>{`(m_2): ${m2.toFixed(2)}`}</Latex></div>
                </div>
                <div style={{ fontSize: '1.2em', fontFamily: 'monospace' }}>
                    <Latex>{`m_1 \\times m_2 = ${(m1 * m2).toFixed(2)}`}</Latex>
                </div>

            </div>

            <div style={{ height: '800px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', overflow: 'hidden' }}>
                <Mafs>
                    <Coordinates.Cartesian />

                    {/* Line 1 */}
                    <Plot.OfX y={(x) => m1 * x} color="#832EC5" />
                    {p1.element}

                    {/* Line 2 */}
                    <Plot.OfX y={(x) => m2 * x} color="#FFC700" />

                    {/* Right Angle Symbol at intersection (0,0) */}
                    <Circle center={[0, 0]} radius={0.5} strokeOpacity={0.3} fillOpacity={0} />

                </Mafs>
            </div>
        </div>
    );
};
