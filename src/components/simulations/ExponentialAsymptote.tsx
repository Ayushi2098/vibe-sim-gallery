import { Latex } from '../Latex';

import { Mafs, Coordinates, Plot, useMovablePoint, LaTeX } from 'mafs';
import 'mafs/core.css';

export const ExponentialAsymptote: React.FC = () => {
    // Control for 'k' (asymptote) and 'a' (scale)
    const asymptoteControl = useMovablePoint([0, 1], {
        color: '#AB5DDC',
        constrain: (p) => [0, p[1]] // Only vertical movement
    });

    const k = asymptoteControl.y;
    const a = 1; // Simplify to shifting for clarity
    const b = 2; // Base

    return (
        <div style={{ padding: '4px', color: '#f8fafc' }}>
            <div style={{ marginBottom: '10px', background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
                <div style={{ flex: '1', marginRight: '20px' }}>

                    <div style={{ fontSize: '1.2em', fontFamily: 'monospace', marginBottom: '4px' }}>
                        <Latex>{`y = ${a} \\cdot ${b}^x + ${Number(k.toFixed(2))}`}</Latex>
                    </div>
                    <div>base (b) = {b}</div>
                </div>
                <div style={{ textAlign: 'right', marginTop: '12px' }}>
                    <div style={{ color: '#AB5DDC', fontWeight: 'bold', marginBottom: '4px' }}>
                        Asymptote: <Latex>{`y = ${k.toFixed(2)}`}</Latex>
                    </div>
                    <div style={{ fontSize: '0.9em', color: '#94a3b8', fontStyle: 'italic' }}>
                        Drag the blue point to shift.
                    </div>
                </div>

            </div>

            <div style={{ height: '800px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', overflow: 'hidden' }}>
                <Mafs height={800}>
                    <Coordinates.Cartesian />

                    {/* The exponential curve */}
                    <Plot.OfX y={(x) => a * Math.pow(b, x) + k} color="#832EC5" />

                    {/* Asymptote Line */}
                    <Plot.OfX y={() => k} color="#AB5DDC" style="dashed" opacity={0.7} />

                    {/* Control for asymptote */}
                    {asymptoteControl.element}
                    <LaTeX at={[1.2, k + 0.6]} tex="\text{Asymptote Control}" color="#AB5DDC" />

                </Mafs>
            </div>
        </div>
    );
};
