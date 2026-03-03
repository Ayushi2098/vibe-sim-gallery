import React from 'react';
import { Mafs, Coordinates, Plot, useMovablePoint, LaTeX } from 'mafs';
import { Latex } from '../Latex';
import 'mafs/core.css';

export const HyperbolaBasic: React.FC = () => {
    // Control for 'a'
    const aControl = useMovablePoint([1, 1], {
        color: '#832EC5',
        constrain: (p) => [1, p[1]] // Constrain x to 1, move up/down for 'a'
    });

    const a = aControl.y;

    return (
        <div style={{ padding: '4px', color: '#f8fafc' }}>
            <div style={{ marginBottom: '10px', background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
                <div style={{ flex: '1', marginRight: '20px' }}>
                    <div style={{ fontSize: '1.2em', fontFamily: 'monospace' }}>
                        <Latex>{`y = \\frac{${a.toFixed(1)}}{x}`}</Latex>
                    </div>
                </div>
                <div style={{ color: '#832EC5', textAlign: 'right', marginTop: '12px' }}>
                    <Latex>{`a = ${a.toFixed(1)}`}</Latex> <span style={{ fontSize: '0.9em', color: '#94a3b8' }}>(Controls steepness)</span>
                </div>
            </div>

            <div style={{ height: '800px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', overflow: 'hidden' }}>
                <Mafs height={800}>
                    <Coordinates.Cartesian />

                    <Plot.OfX y={(x) => a / x} color="#832EC5" />

                    {/* Control Point */}
                    {aControl.element}
                    <LaTeX at={[1.6, a]} tex="a" color="#832EC5" />
                </Mafs>
            </div>
        </div>
    );
};
