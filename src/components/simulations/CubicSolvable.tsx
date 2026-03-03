import React from 'react';
import { Mafs, Coordinates, Plot, useMovablePoint, LaTeX } from 'mafs';
import { Latex } from '../Latex';

import 'mafs/core.css';

export const CubicSolvable: React.FC = () => {
    // Control constant term 'd' to shift up/down and change number of roots
    const dPoint = useMovablePoint([0, 0], {
        color: '#832EC5',
        constrain: (p) => [0, p[1]]
    });

    const d = dPoint.y;
    // f(x) = x^3 - 3x + d
    // Local max at -1 (val 2+d), min at 1 (val -2+d)
    const func = (x: number) => Math.pow(x, 3) - 3 * x + d;

    // Approximated roots logic for display (not exact generic solver, tailored to this nice function)
    // Just scan or use cardano? Let's just scan roughly for visualization or use Newton for the specific ones nearby
    // This is just a vis, let's trust Mafs to plot it, but we want to highlight roots.
    // Actually, x^3 - 3x + d = 0 is solvable analytically.
    // For simplicity in visualizer, let's just highlight the intersections visually? 
    // No, better to compute them if we can.
    // Let's stick to valid visual feedback. 

    return (
        <div style={{ padding: '4px' }}>


            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
                <div style={{ fontSize: '1.2em', fontFamily: 'monospace' }}>
                    <Latex>{`x^3 - 3x + ${Number(d.toFixed(2))} = 0`}</Latex>
                </div>
            </div>

            <div style={{ height: '800px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', overflow: 'hidden', background: '#0a0a0a' }}>
                <Mafs height={800}>
                    <Coordinates.Cartesian />
                    <Plot.OfX y={func} color="#832EC5" />
                    <Plot.OfX y={() => 0} color="rgba(255,255,255,0.2)" style="dashed" weight={1} />
                    {dPoint.element}
                    <LaTeX at={[0.5, d]} tex="d" color="#832EC5" />
                </Mafs>
            </div>
        </div>
    );
};
