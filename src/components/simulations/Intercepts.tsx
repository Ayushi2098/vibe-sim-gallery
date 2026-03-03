import React from 'react';
import { Coordinates, useMovablePoint, LaTeX, Plot } from 'mafs';
import { Latex } from '../Latex';
import { SimulationContainer } from './SimulationContainer';

export const Intercepts: React.FC = () => {
    // Leftmost is y-intercept (at x=0) compared to x-intercept (at x=2)
    const yIntPoint = useMovablePoint([0, 3], {
        color: '#832EC5', // Primary (Leftmost)
        constrain: (p) => [0, p[1]] // Constrain to y-axis
    });
    const xIntPoint = useMovablePoint([2, 0], {
        color: '#AB5DDC', // Secondary
        constrain: (p) => [p[0], 0] // Constrain to x-axis
    });

    // Avoid both being 0 to prevent undefined line
    const a = Math.abs(xIntPoint.x) < 0.1 ? 0.1 : xIntPoint.x;
    const b = Math.abs(yIntPoint.y) < 0.1 ? 0.1 : yIntPoint.y;

    // Line equation from intercepts: x/a + y/b = 1  => y = b - (b/a)x
    const slope = -b / a;
    const yIntercept = b;

    return (
        <SimulationContainer
            title="Line from Intercepts"
            tooltip="Drag the intercepts along the axes to change the line."
            infoPanel={
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ color: '#AB5DDC' }}>
                        x-intercept: <Latex>{`(${xIntPoint.x.toFixed(1)}, 0)`}</Latex>
                    </div>
                    <div style={{ color: '#832EC5' }}>
                        y-intercept: <Latex>{`(0, ${yIntPoint.y.toFixed(1)})`}</Latex>
                    </div>
                    <div style={{ marginTop: '10px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '10px' }}>
                        <Latex>{`y = ${slope.toFixed(2)}x ${yIntercept >= 0 ? '+' : '-'} ${Math.abs(yIntercept).toFixed(2)}`}</Latex>
                    </div>
                </div>
            }
        >
            <Coordinates.Cartesian />

            {/* The Line passing through intercepts */}
            <Plot.OfX y={(x) => slope * x + yIntercept} color="#832EC5" />

            {/* Movable Intercept Points */}
            {yIntPoint.element}
            {xIntPoint.element}

            {/* Labels */}
            <LaTeX at={[xIntPoint.x, 0.5]} tex="x\text{-int}" color="#AB5DDC" />
            <LaTeX at={[0.5, yIntPoint.y]} tex="y\text{-int}" color="#832EC5" />
        </SimulationContainer>
    );
};
