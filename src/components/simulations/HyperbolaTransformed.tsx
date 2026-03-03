import { Latex } from '../Latex';

import { Mafs, Coordinates, Plot, useMovablePoint, LaTeX } from 'mafs';
import 'mafs/core.css';

export const HyperbolaTransformed: React.FC = () => {
    // Control for center (h, k)
    const center = useMovablePoint([1, 1], { color: '#832EC5' });
    const h = center.x;
    const k = center.y;
    const a = 1; // Fixed 'a' for simplicity in this transformation demo

    return (
        <div style={{ padding: '4px', color: '#f8fafc' }}>
            <div style={{ marginBottom: '10px', background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
                <div style={{ flex: '1', marginRight: '20px' }}>

                    <div style={{ fontSize: '1.2em', fontFamily: 'monospace' }}>
                        <Latex>{`y = \\frac{${a}}{x - ${h.toFixed(1)}} + ${k.toFixed(1)}`}</Latex>
                    </div>
                </div>
                <div style={{ color: '#832EC5', textAlign: 'right', marginTop: '12px' }}>
                    Center/Asymptotes Intersection: <Latex>{`(${h.toFixed(1)}, ${k.toFixed(1)})`}</Latex>
                </div>
            </div>

            <div style={{ height: '800px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', overflow: 'hidden' }}>
                <Mafs height={800}>
                    <Coordinates.Cartesian />

                    {/* Graph */}
                    <Plot.OfX y={(x) => a / (x - h) + k} color="#832EC5" />

                    {/* Asymptotes */}
                    <Plot.OfX y={() => k} color="#AB5DDC" style="dashed" opacity={0.5} />
                    {/* Vertical asymptote is harder to draw infinite line with Plot.OfX, but visual center implies it */}

                    {/* Center Point */}
                    {center.element}
                    <LaTeX at={[h, k + 0.5]} tex="\text{Center (h,k)}" color="#832EC5" />
                </Mafs>
            </div>
        </div>
    );
};
