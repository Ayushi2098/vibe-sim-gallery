import React from 'react';
import { Mafs, Coordinates, Plot, Point, LaTeX } from 'mafs';
import { Latex } from '../Latex';
import 'mafs/core.css';

export const CubicBasic: React.FC = () => {
    return (
        <div style={{ padding: '4px' }}>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
                <div style={{ fontSize: '1.2em', fontFamily: 'monospace', marginBottom: '5px' }}>
                    <Latex>y = x^3</Latex>
                </div>
                <div style={{ color: '#832EC5' }}>
                    Point of Inflection: <Latex>(0, 0)</Latex>
                </div>
            </div>

            <div style={{ height: '800px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', overflow: 'hidden', background: '#0a0a0a' }}>
                <Mafs height={800}>
                    <Coordinates.Cartesian />
                    <Plot.OfX y={(x) => x * x * x} color="#832EC5" />
                    <Point x={0} y={0} color="#832EC5" />
                    <LaTeX at={[0, -0.5]} tex="\text{foci / inflection}" color="#832EC5" />
                </Mafs>
            </div>
        </div>
    );
};
