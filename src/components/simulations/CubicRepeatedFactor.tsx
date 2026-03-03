import { Latex } from '../Latex';
import { Mafs, Coordinates, Plot, useMovablePoint } from 'mafs';
import 'mafs/core.css';

export const CubicRepeatedFactor: React.FC = () => {
    // Repeated root 'a' (touches) and single root 'b' (cuts)
    const rootA = useMovablePoint([-1, 0], { color: '#832EC5', constrain: (p) => [p[0], 0] });
    const rootB = useMovablePoint([2, 0], { color: '#AB5DDC', constrain: (p) => [p[0], 0] });

    const a = rootA.x;
    const b = rootB.x;
    const k = 0.5;

    return (
        <div style={{ padding: '4px' }}>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '8px', marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '1.2em', fontFamily: 'monospace' }}>
                    <Latex>{`y = ${k}(x - ${a.toFixed(1)})^2(x - ${b.toFixed(1)})`}</Latex>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ color: '#832EC5' }}>Double Root (Touch): <Latex>{`x = ${a.toFixed(1)}`}</Latex></div>
                    <div style={{ color: '#AB5DDC' }}>Single Root (Cut): <Latex>{`x = ${b.toFixed(1)}`}</Latex></div>
                </div>
            </div>

            <div style={{ height: '800px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', overflow: 'hidden', background: '#0a0a0a' }}>
                <Mafs height={800}>
                    <Coordinates.Cartesian />
                    <Plot.OfX y={(x) => k * Math.pow(x - a, 2) * (x - b)} color="#832EC5" />
                    {rootA.element}
                    {rootB.element}
                </Mafs>
            </div>
        </div>
    );
};
