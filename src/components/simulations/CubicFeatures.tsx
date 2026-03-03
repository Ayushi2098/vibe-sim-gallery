import React, { useState } from 'react';
import { Mafs, Coordinates, Plot, Point, LaTeX } from 'mafs';
import { Latex } from '../Latex';
import 'mafs/core.css';

export const CubicFeatures: React.FC = () => {
    // Define cubic based on control point to allow some exploration
    // Let's just do a fixed generic cubic with toggleable annotations for features
    const [showFeatures, setShowFeatures] = useState(true);

    // Fixed function for demonstration: f(x) = x^3 - 3x + 1
    // Local max at x=-1, min at x=1. Inflection at x=0.
    const func = (x: number) => Math.pow(x, 3) - 3 * x + 1;

    return (
        <div style={{ padding: '4px' }}>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '8px', marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '1.2em', fontFamily: 'monospace' }}>
                    <Latex>{`y = x^3 - 3x + 1`}</Latex>
                </div>
                <div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                        <input
                            type="checkbox"
                            checked={showFeatures}
                            onChange={e => setShowFeatures(e.target.checked)}
                        />
                        Show Features
                    </label>
                </div>
            </div>

            <div style={{ height: '800px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', overflow: 'hidden', background: '#0a0a0a' }}>
                <Mafs height={800}>
                    <Coordinates.Cartesian />
                    <Plot.OfX y={func} color="#832EC5" />
                    {showFeatures && (
                        <>
                            <Point x={-1} y={3} color="#832EC5" />
                            <LaTeX at={[-1, 3.5]} tex="\text{Local Max}" color="#832EC5" />
                            <Point x={1} y={-1} color="#eab308" />
                            <LaTeX at={[1, -1.5]} tex="\text{Local Min}" color="#eab308" />
                            <Point x={0} y={1} color="#AB5DDC" />
                            <LaTeX at={[0.5, 1]} tex="\text{Inflection}" color="#AB5DDC" />
                            <Plot.OfX y={(x) => -3 * x + 1} color="#AB5DDC" opacity={0.3} style="dashed" />
                        </>
                    )}
                </Mafs>
            </div>
        </div>
    );
};
