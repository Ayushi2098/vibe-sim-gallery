import { Latex } from '../Latex';

import { Mafs, Coordinates, Plot, useMovablePoint, LaTeX } from 'mafs';
import 'mafs/core.css';

export const CubicIrreducible: React.FC = () => {
    // Single real root 'a'
    const rootA = useMovablePoint([-2, 0], { color: '#832EC5', constrain: (p) => [p[0], 0] });

    // Control for the quadratic part (x^2 + p) where p > 0 for irreducibility
    const pPoint = useMovablePoint([0, 2], {
        color: '#AB5DDC',
        constrain: (p) => [0, Math.max(0.5, p[1])]
    });

    const a = rootA.x;
    const p = pPoint.y;
    const k = 0.2;

    return (
        <div style={{ padding: '4px', color: '#f8fafc' }}>
            <div style={{ marginBottom: '10px', background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '8px' }}>

                <div style={{ fontSize: '1.2em', fontFamily: 'monospace' }}>
                    <Latex>{`y = ${k}(x - ${a.toFixed(1)})(x^2 + ${p.toFixed(1)})`}</Latex>
                </div>
                <div style={{ textAlign: 'right', marginTop: '10px' }}>
                    <div style={{ color: '#832EC5' }}>Single Real Root: <Latex>{`${a.toFixed(1)}`}</Latex></div>
                    <div style={{ color: '#AB5DDC' }}>No other real roots (Quadratic term {'>'} 0)</div>
                </div>
            </div>

            <div style={{ height: '800px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', overflow: 'hidden' }}>
                <Mafs height={800}>
                    <Coordinates.Cartesian />

                    <Plot.OfX y={(x) => k * (x - a) * (x * x + p)} color="#832EC5" />

                    {rootA.element}
                    {pPoint.element}
                    <LaTeX at={[1.5, p + 0.6]} tex="\text{Quadratic Offset}" color="#FFE999" />
                </Mafs>
            </div>
        </div>
    );
};
