import React from 'react';
import { Coordinates, Plot, useMovablePoint, LaTeX } from 'mafs';
import { Latex } from '../Latex';
import { SimulationContainer } from './SimulationContainer';

export const InverseCubic: React.FC = () => {
    const center = useMovablePoint([0, 0], { color: '#832EC5' });
    const h = center.x;
    const k = center.y;
    const a = 1;

    // Cube root helper
    const cbrt = (x: number) => {
        const sign = x < 0 ? -1 : 1;
        return sign * Math.pow(Math.abs(x), 1 / 3);
    };

    return (
        <SimulationContainer
            title="Inverse Cubic Function"
            subtitle={
                <div style={{ fontSize: '1.2em', fontFamily: 'monospace' }}>
                    <Latex>{`y = ${a === 1 ? '' : a}(x ${h >= 0 ? '-' : '+'} ${Math.abs(h).toFixed(1)})^{1/3} ${k >= 0 ? '+' : '-'} ${Math.abs(k).toFixed(1)}`}</Latex>
                </div>
            }
            tooltip="Drag the purple point to adjust the inflection point (h, k)."
            infoPanel={
                <div style={{ color: '#832EC5' }}>
                    Inflection/Center: <Latex>{`(${h.toFixed(1)}, ${k.toFixed(1)})`}</Latex>
                </div>
            }
            height={800}
        >
            <Coordinates.Cartesian />

            <Plot.OfX y={(x) => a * cbrt(x - h) + k} color="#832EC5" />

            {center.element}
            <LaTeX at={[h, k - 0.5]} tex="\text{Center}" color="#832EC5" />
        </SimulationContainer>
    );
};
