import React, { useState } from 'react';
import { Mafs, useMovablePoint, Line, Circle, Polygon, LaTeX } from 'mafs';
import { Latex } from '../Latex';

import 'mafs/core.css';

export const IntervalNotationNumberLine: React.FC = () => {
    const leftPoint = useMovablePoint([-2, 0], { color: '#832EC5' });
    const rightPoint = useMovablePoint([3, 0], { color: '#832EC5' });
    const [leftClosed, setLeftClosed] = useState(true);
    const [rightClosed, setRightClosed] = useState(false);

    const left = Math.min(leftPoint.x, rightPoint.x);
    const right = Math.max(leftPoint.x, rightPoint.x);

    const leftBracket = leftClosed ? '[' : '(';
    const rightBracket = rightClosed ? ']' : ')';

    return (
        <div style={{ padding: '4px' }}>


            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
                <div style={{ fontSize: '1.5em', marginBottom: '15px', color: '#832EC5', fontWeight: 'bold' }}>
                    <Latex>{`${leftBracket}${left.toFixed(1)}, ${right.toFixed(1)}${rightBracket}`}</Latex>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '8px', fontWeight: '500' }}>Left Endpoint</label>
                        <div style={{ display: 'flex', background: 'rgba(255,255,255,0.03)', padding: '4px', borderRadius: '6px', gap: '4px' }}>
                            <button onClick={() => setLeftClosed(false)} style={{ flex: 1, padding: '4px', background: !leftClosed ? '#832EC5' : 'transparent', border: 'none', borderRadius: '4px', color: '#f8fafc', cursor: 'pointer', fontSize: '0.9rem', transition: 'all 0.2s', fontWeight: !leftClosed ? '600' : '400' }}>Open (</button>
                            <button onClick={() => setLeftClosed(true)} style={{ flex: 1, padding: '4px', background: leftClosed ? '#832EC5' : 'transparent', border: 'none', borderRadius: '4px', color: '#f8fafc', cursor: 'pointer', fontSize: '0.9rem', transition: 'all 0.2s', fontWeight: leftClosed ? '600' : '400' }}>Closed [</button>
                        </div>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '8px', fontWeight: '500' }}>Right Endpoint</label>
                        <div style={{ display: 'flex', background: 'rgba(255,255,255,0.03)', padding: '4px', borderRadius: '6px', gap: '4px' }}>
                            <button onClick={() => setRightClosed(false)} style={{ flex: 1, padding: '4px', background: !rightClosed ? '#832EC5' : 'transparent', border: 'none', borderRadius: '4px', color: '#f8fafc', cursor: 'pointer', fontSize: '0.9rem', transition: 'all 0.2s', fontWeight: !rightClosed ? '600' : '400' }}>Open )</button>
                            <button onClick={() => setRightClosed(true)} style={{ flex: 1, padding: '4px', background: rightClosed ? '#832EC5' : 'transparent', border: 'none', borderRadius: '4px', color: '#f8fafc', cursor: 'pointer', fontSize: '0.9rem', transition: 'all 0.2s', fontWeight: rightClosed ? '600' : '400' }}>Closed ]</button>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ height: '800px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', overflow: 'hidden', background: '#0a0a0a' }}>
                <Mafs viewBox={{ x: [-5, 5], y: [-1, 1] }} preserveAspectRatio={false}>
                    <Line.Segment point1={[-5, 0]} point2={[5, 0]} color="#94a3b8" />
                    {Array.from({ length: 11 }, (_, i) => i - 5).map(n => {
                        const isLeft = Math.abs(left - n) < 0.1;
                        const isRightEnd = Math.abs(right - n) < 0.1;
                        const color = (isLeft || isRightEnd) ? "#832EC5" : "#94a3b8";
                        const labelColor = (isLeft || isRightEnd) ? "#832EC5" : "#f8fafc";
                        return (
                            <React.Fragment key={n}>
                                <Line.Segment point1={[n, -0.15]} point2={[n, 0.15]} color={color} weight={isLeft || isRightEnd ? 3 : 1} />
                                <LaTeX at={[n, -0.5]} tex={n.toString()} color={labelColor} />
                            </React.Fragment>
                        );
                    })}
                    <Polygon points={[[left, -0.25], [right, -0.25], [right, 0.25], [left, 0.25]]} color="#832EC5" fillOpacity={0.3} />
                    {leftClosed ? (
                        <Circle center={[left, 0]} radius={0.15} color="#832EC5" fillOpacity={1} />
                    ) : (
                        <Circle center={[left, 0]} radius={0.15} color="#832EC5" fillOpacity={0} strokeStyle="solid" />
                    )}
                    {rightClosed ? (
                        <Circle center={[right, 0]} radius={0.15} color="#832EC5" fillOpacity={1} />
                    ) : (
                        <Circle center={[right, 0]} radius={0.15} color="#832EC5" fillOpacity={0} strokeStyle="solid" />
                    )}
                    <g opacity={0.01}>{leftPoint.element}{rightPoint.element}</g>
                    <LaTeX at={[left, 0.6]} tex={left.toFixed(1)} color="#832EC5" />
                    <LaTeX at={[right, 0.6]} tex={right.toFixed(1)} color="#832EC5" />
                </Mafs>
            </div>
        </div>
    );
};
