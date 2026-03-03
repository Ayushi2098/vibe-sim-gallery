import React, { useState } from 'react';
import { Mafs, Coordinates, Plot, LaTeX } from 'mafs';
import { Latex } from '../Latex';
import 'mafs/core.css';

export const GraphSteepness: React.FC = () => {
    const [slope1, setSlope1] = useState(0.5);
    const [slope2, setSlope2] = useState(2);
    const [slope3, setSlope3] = useState(-1.5);

    const lines = [
        { slope: slope1, color: '#832EC5', label: 'Line A', setter: setSlope1 },
        { slope: slope2, color: '#FFC700', label: 'Line B', setter: setSlope2 },
        { slope: slope3, color: '#AB5DDC', label: 'Line C', setter: setSlope3 }
    ];

    // Sort by steepness (absolute value of slope)
    const sortedBySeepness = [...lines].sort((a, b) => Math.abs(b.slope) - Math.abs(a.slope));

    return (
        <div style={{ padding: '4px' }}>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '8px', marginBottom: '15px', display: 'flex', flexWrap: 'wrap', gap: '30px' }}>
                <div style={{ flex: '1', minWidth: '250px' }}>
                    <div style={{ fontSize: '0.95em', marginBottom: '10px', color: '#94a3b8', fontWeight: 'bold' }}>
                        Steepness Order (from steepest to flattest):
                    </div>
                    {sortedBySeepness.map((line, index) => (
                        <div key={line.label} style={{ color: line.color, fontSize: '1em', fontFamily: 'monospace', marginBottom: '5px' }}>
                            {index + 1}. {line.label}: <Latex>{`|m| = ${Math.abs(line.slope).toFixed(2)}`}</Latex>
                        </div>
                    ))}
                </div>

                <div style={{ flex: '1.5', minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {lines.map(({ label, slope, setter, color }) => (
                        <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <label style={{ color, minWidth: '90px', fontSize: '0.9em', fontWeight: 'bold' }}>
                                {label} (m={slope.toFixed(1)}):
                            </label>
                            <input
                                type="range"
                                min="-5"
                                max="5"
                                step="0.1"
                                value={slope}
                                onChange={(e) => setter(parseFloat(e.target.value))}
                                style={{ flex: 1, accentColor: color }}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ height: '800px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', overflow: 'hidden', background: '#0a0a0a' }}>
                <Mafs height={800}>
                    <Coordinates.Cartesian />
                    {lines.map(({ slope, color, label }) => (
                        <React.Fragment key={label}>
                            <Plot.OfX y={(x) => slope * x} color={color} />
                            <LaTeX at={[2.5, slope * 2.5 + 0.4]} tex={label.replace('Line ', 'L_')} color={color} />
                        </React.Fragment>
                    ))}
                </Mafs>
            </div>
        </div>
    );
};
