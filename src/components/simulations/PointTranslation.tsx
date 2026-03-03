import React, { useState } from 'react';
import { Mafs, Coordinates, Vector, Point, useMovablePoint, LaTeX } from 'mafs';
import { Latex } from '../Latex';

import 'mafs/core.css';

export const PointTranslation: React.FC = () => {
    // Start point
    const point = useMovablePoint([0, 0], { color: '#832EC5' });

    // Translation vector
    const [dx, setDx] = useState(2);
    const [dy, setDy] = useState(3);

    const endPoint = { x: point.x + dx, y: point.y + dy };

    return (
        <div style={{ padding: '4px' }}>


            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '8px', marginBottom: '15px', display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center' }}>
                <div style={{ flex: '1', minWidth: '200px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '5px' }}>Shift Horizontal (x): {dx}</label>
                        <input type="range" min="-5" max="5" step="1" value={dx} onChange={(e) => setDx(parseFloat(e.target.value))} style={{ width: '100%', accentColor: '#832EC5' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '5px' }}>Shift Vertical (y): {dy}</label>
                        <input type="range" min="-5" max="5" step="1" value={dy} onChange={(e) => setDy(parseFloat(e.target.value))} style={{ width: '100%', accentColor: '#832EC5' }} />
                    </div>
                </div>
                <div style={{ flex: '1', minWidth: '200px', fontFamily: 'monospace', fontSize: '1rem' }}>
                    Original: <Latex>{`(${point.x.toFixed(1)}, ${point.y.toFixed(1)})`}</Latex><br />
                    Translation: <Latex>{`(${dx > 0 ? '+' : ''}${dx}, ${dy > 0 ? '+' : ''}${dy})`}</Latex><br />
                    <span style={{ color: '#AB5DDC' }}>New Position: <Latex>{`(${endPoint.x.toFixed(1)}, ${endPoint.y.toFixed(1)})`}</Latex></span>
                </div>
            </div>

            <div style={{ height: '800px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', overflow: 'hidden', background: '#0a0a0a' }}>
                <Mafs height={800}>
                    <Coordinates.Cartesian />
                    {point.element}
                    <LaTeX at={[point.x, point.y - 0.4]} tex="P" color="#832EC5" />
                    <Vector tail={[point.x, point.y]} tip={[endPoint.x, endPoint.y]} color="#AB5DDC" />
                    <Point x={endPoint.x} y={endPoint.y} color="#AB5DDC" />
                    <LaTeX at={[endPoint.x, endPoint.y + 0.4]} tex="P'" color="#AB5DDC" />
                </Mafs>
            </div>
        </div>
    );
};
