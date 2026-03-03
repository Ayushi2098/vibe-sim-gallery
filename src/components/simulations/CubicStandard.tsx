import React from 'react';
import { Mafs, Coordinates, Plot, Point, LaTeX } from 'mafs';
import { Latex } from '../Latex';
import 'mafs/core.css';

export const CubicStandard: React.FC = () => {
    // Coefficients controls
    // Using sliders might be better, but points are consistent with our style.
    // Let's use points on a "UI panel" within Mafs logic or just sliders in HTML?
    // User requested "Matching a cubic equation...".
    // Let's stick to movable points representing coefficients if possible, or simple HTML inputs.
    // HTML sliders are cleaner for 4 generic info.

    const [a, setA] = React.useState(1);
    const [b, setB] = React.useState(0);
    const [c, setC] = React.useState(-2);
    const [d, setD] = React.useState(0);

    return (
        <div style={{ padding: '4px' }}>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '8px', marginBottom: '15px', display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center' }}>
                <div style={{ fontSize: '1.2em', fontFamily: 'monospace', flex: '1' }}>
                    <Latex>{`y = ${a}x^3 + ${b}x^2 + ${c}x + ${d}`}</Latex>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', maxWidth: '400px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <span style={{ minWidth: '30px' }}>a:</span>
                        <input type="range" min="-3" max="3" step="0.1" value={a} onChange={e => setA(parseFloat(e.target.value))} style={{ width: '80px', accentColor: '#832EC5' }} />
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <span style={{ minWidth: '30px' }}>b:</span>
                        <input type="range" min="-5" max="5" step="0.1" value={b} onChange={e => setB(parseFloat(e.target.value))} style={{ width: '80px', accentColor: '#832EC5' }} />
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <span style={{ minWidth: '30px' }}>c:</span>
                        <input type="range" min="-5" max="5" step="0.1" value={c} onChange={e => setC(parseFloat(e.target.value))} style={{ width: '80px', accentColor: '#832EC5' }} />
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <span style={{ minWidth: '30px' }}>d:</span>
                        <input type="range" min="-5" max="5" step="0.1" value={d} onChange={e => setD(parseFloat(e.target.value))} style={{ width: '80px', accentColor: '#832EC5' }} />
                    </label>
                </div>
            </div>

            <div style={{ height: '800px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', overflow: 'hidden', background: '#0a0a0a' }}>
                <Mafs height={800}>
                    <Coordinates.Cartesian />
                    <Plot.OfX y={(x) => a * Math.pow(x, 3) + b * Math.pow(x, 2) + c * x + d} color="#832EC5" />
                    <Point x={0} y={d} color="#832EC5" />
                    <LaTeX at={[0.7, d]} tex="\text{y-int}" color="#832EC5" />
                </Mafs>
            </div>
        </div>
    );
};
