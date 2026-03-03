import { Latex } from '../Latex';
import { Mafs, Coordinates, Plot, useMovablePoint } from 'mafs';
import 'mafs/core.css';

export const CubicFactorized: React.FC = () => {
    const root1 = useMovablePoint([-2, 0], { color: '#832EC5', constrain: (p) => [p[0], 0] });
    const root2 = useMovablePoint([0, 0], { color: '#AB5DDC', constrain: (p) => [p[0], 0] });
    const root3 = useMovablePoint([2, 0], { color: 'rgba(255,255,255,0.7)', constrain: (p) => [p[0], 0] });

    const a = root1.x;
    const b = root2.x;
    const c = root3.x;

    const k = 0.5; // vertical scale

    return (
        <div style={{ padding: '4px' }}>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '8px', marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '1.2em', fontFamily: 'monospace' }}>
                    <Latex>{`y = ${k}(x - ${a.toFixed(1)})(x - ${b.toFixed(1)})(x - ${c.toFixed(1)})`}</Latex>
                </div>
                <div>
                    Roots: <span style={{ color: '#832EC5' }}><Latex>{`${a.toFixed(1)}`}</Latex></span>, <span style={{ color: '#AB5DDC' }}><Latex>{`${b.toFixed(1)}`}</Latex></span>, <span style={{ color: 'rgba(255,255,255,0.7)' }}><Latex>{`${c.toFixed(1)}`}</Latex></span>
                </div>
            </div>

            <div style={{ height: '800px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', overflow: 'hidden', background: '#0a0a0a' }}>
                <Mafs height={800}>
                    <Coordinates.Cartesian />
                    <Plot.OfX y={(x) => k * (x - a) * (x - b) * (x - c)} color="#832EC5" />
                    {root1.element}
                    {root2.element}
                    {root3.element}
                </Mafs>
            </div>
        </div>
    );
};
