import React, { useState } from 'react';
import { Mafs, Coordinates, Plot, Point, LaTeX } from 'mafs';
import { Latex } from '../Latex';

import 'mafs/core.css';

export const QuadraticCharacteristics: React.FC = () => {
    // Parabola defined by vertex (h, k) and 'a'
    const [h, setH] = useState(1);
    const [k, setK] = useState(-2);
    const [a, setA] = useState(1);

    // Calculate features
    const isMin = a > 0;
    const yIntercept = a * Math.pow(0 - h, 2) + k;

    // Roots logic
    const hasRealRoots = -k / a >= 0;
    const root1 = hasRealRoots ? h - Math.sqrt(-k / a) : null;
    const root2 = hasRealRoots ? h + Math.sqrt(-k / a) : null;

    return (
        <div style={{ padding: '4px', color: '#f8fafc' }}>
            <div style={{ marginBottom: '10px', background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
                <div style={{ flex: '1', marginRight: '20px' }}>

                    <div style={{ fontSize: '1.2em', fontFamily: 'monospace', marginTop: '5px' }}>
                        <Latex>{`y = ${a === 1 ? '' : a === -1 ? '-' : a}(x ${h >= 0 ? '-' : '+'} ${Math.abs(h)})^2 ${k >= 0 ? '+' : '-'} ${Math.abs(k)}`}</Latex>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.8em', marginBottom: '1px' }}>a: {a}</label>
                        <input
                            type="range"
                            min="-3"
                            max="3"
                            step="0.5"
                            value={a}
                            onChange={(e) => {
                                const val = parseFloat(e.target.value);
                                setA(val === 0 ? 0.5 : val);
                            }}
                            style={{ width: '80px' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.8em', marginBottom: '1px' }}>h: {h}</label>
                        <input
                            type="range"
                            min="-5"
                            max="5"
                            step="1"
                            value={h}
                            onChange={(e) => setH(parseInt(e.target.value))}
                            style={{ width: '80px' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.8em', marginBottom: '1px' }}>k: {k}</label>
                        <input
                            type="range"
                            min="-5"
                            max="5"
                            step="1"
                            value={k}
                            onChange={(e) => setK(parseInt(e.target.value))}
                            style={{ width: '80px' }}
                        />
                    </div>
                </div>
            </div>

            {/* Info Panel */}
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '8px', marginBottom: '15px', fontSize: '0.9em', display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
                <div><span style={{ color: '#832EC5' }}>Vertex:</span> ({h}, {k})</div>
                <div><span style={{ color: '#832EC5' }}>Axis:</span> x = {h}</div>
                <div><span style={{ color: '#832EC5' }}>{isMin ? "Min" : "Max"}:</span> {k}</div>
                <div><span style={{ color: '#8b5cf6' }}>Y-Int:</span> (0, {yIntercept})</div>
                <div><span style={{ color: '#10b981' }}>Roots:</span> {hasRealRoots ? `${root1?.toFixed(2)}, ${root2?.toFixed(2)}` : "None"}</div>
            </div>

            <div style={{ height: '800px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', overflow: 'hidden', background: '#0f172a' }}>
                <Mafs
                    height={800}
                    viewBox={{ x: [-10, 10], y: [-10, 10] }}
                    preserveAspectRatio={false}
                >
                    <Coordinates.Cartesian />

                    {/* Parabola */}
                    <Plot.OfX
                        y={(x) => a * Math.pow(x - h, 2) + k}
                        color="#AB5DDC"
                        weight={3}
                    />

                    {/* Axis of Symmetry */}
                    <Plot.OfY
                        x={() => h}
                        style="dashed"
                        color="#832EC5"
                        opacity={0.6}
                    />

                    {/* Vertex Point */}
                    <Point x={h} y={k} color="#832EC5" />
                    <LaTeX at={[h, k + (a > 0 ? -1 : 1)]} tex={`V(${h}, ${k})`} color="#832EC5" />

                    {/* Y Intercept */}
                    <Point x={0} y={yIntercept} color="#8b5cf6" />

                    {/* Roots */}
                    {hasRealRoots && root1 !== null && (
                        <Point x={root1} y={0} color="#10b981" />
                    )}
                    {hasRealRoots && root2 !== null && (
                        <Point x={root2} y={0} color="#10b981" />
                    )}

                </Mafs>
            </div>
        </div>
    );
};
