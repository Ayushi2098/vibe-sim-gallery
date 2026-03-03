import React from 'react';
import { Mafs, Coordinates, Plot, useMovablePoint, LaTeX } from 'mafs';
import { Latex } from '../Latex';

import 'mafs/core.css';

export const CubicTransformed: React.FC = () => {
    const inflection = useMovablePoint([1, 1], { color: '#832EC5' });
    const h = inflection.x;
    const k = inflection.y;
    const a = 0.5; // Scale factor

    return (
        <div style={{ padding: '4px' }}>


            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '8px', marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '1.2em', fontFamily: 'monospace' }}>
                    <Latex>{`y = ${a}(x - ${h.toFixed(1)})^3 + ${k.toFixed(1)}`}</Latex>
                </div>
                <div style={{ color: '#832EC5' }}>
                    Inflection Point: <Latex>{`(${h.toFixed(1)}, ${k.toFixed(1)})`}</Latex>
                </div>
            </div>

            <div style={{ height: '800px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', overflow: 'hidden', background: '#0a0a0a' }}>
                <Mafs height={800}>
                    <Coordinates.Cartesian />
                    <Plot.OfX y={(x) => a * Math.pow(x - h, 3) + k} color="#832EC5" />
                    {inflection.element}
                    <LaTeX at={[h, k - 0.5]} tex="\text{Inflection}" color="#832EC5" />
                </Mafs>
            </div>
        </div>
    );
};
