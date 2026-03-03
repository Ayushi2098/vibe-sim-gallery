import React, { useState } from 'react';
import { Mafs, useMovablePoint, Line, Circle, Polygon, LaTeX } from 'mafs';
import { Latex } from '../Latex';

import 'mafs/core.css';

export const InequalitiesNumberLine: React.FC = () => {
    const point = useMovablePoint([2, 0], { color: '#832EC5' });
    const [inequalityType, setInequalityType] = useState<'lt' | 'lte' | 'gt' | 'gte'>('gte');

    const symbols = {
        'lt': '<',
        'lte': '\\leq',
        'gt': '>',
        'gte': '\\geq'
    };

    const isOpen = inequalityType === 'lt' || inequalityType === 'gt';
    const isRight = inequalityType === 'gt' || inequalityType === 'gte';

    const buttonStyle = (type: typeof inequalityType) => ({
        padding: '10px 20px',
        background: inequalityType === type ? '#832EC5' : 'rgba(255,255,255,0.05)',
        border: '1px solid',
        borderColor: inequalityType === type ? '#832EC5' : 'rgba(255,255,255,0.1)',
        borderRadius: '6px',
        color: '#f8fafc',
        cursor: 'pointer',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        fontSize: '1rem',
        fontWeight: inequalityType === type ? '600' : '400',
        minWidth: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: inequalityType === type ? '0 4px 12px rgba(168, 85, 247, 0.3)' : 'none',
        transform: inequalityType === type ? 'translateY(-1px)' : 'none'
    });

    return (
        <div style={{ padding: '4px' }}>


            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '8px', marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
                <div style={{ fontSize: '1.8em', color: '#832EC5', fontWeight: 'bold' }}>
                    <Latex>{`x ${symbols[inequalityType]} ${point.x.toFixed(1)}`}</Latex>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <button onClick={() => setInequalityType('lt')} style={buttonStyle('lt')}><Latex>{'x <'}</Latex></button>
                    <button onClick={() => setInequalityType('lte')} style={buttonStyle('lte')}><Latex>{'x \\leq'}</Latex></button>
                    <button onClick={() => setInequalityType('gt')} style={buttonStyle('gt')}><Latex>{'x >'}</Latex></button>
                    <button onClick={() => setInequalityType('gte')} style={buttonStyle('gte')}><Latex>{'x \\geq'}</Latex></button>
                </div>
            </div>

            <div style={{ height: '800px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', overflow: 'hidden', background: '#0a0a0a' }}>
                <Mafs viewBox={{ x: [-5.5, 5.5], y: [-1, 1] }} preserveAspectRatio={false}>
                    <Line.Segment point1={[-5.5, 0]} point2={[5.5, 0]} color="#94a3b8" weight={2} />
                    {Array.from({ length: 11 }, (_, i) => i - 5).map(n => {
                        const isActive = Math.abs(point.x - n) < 0.1;
                        const color = isActive ? "#832EC5" : "#94a3b8";
                        const labelColor = isActive ? "#832EC5" : "#f8fafc";
                        return (
                            <React.Fragment key={n}>
                                <Line.Segment point1={[n, -0.12]} point2={[n, 0.12]} color={color} weight={isActive ? 3 : 1.5} />
                                <LaTeX at={[n, -0.5]} tex={n.toString()} color={labelColor} />
                            </React.Fragment>
                        );
                    })}
                    <Polygon
                        points={isRight ? [[point.x, -0.25], [5.5, -0.25], [5.5, 0.25], [point.x, 0.25]] : [[-5.5, -0.25], [point.x, -0.25], [point.x, 0.25], [-5.5, 0.25]]}
                        color="#832EC5"
                        fillOpacity={0.25}
                    />
                    {isOpen ? (
                        <Circle center={[point.x, 0]} radius={0.15} color="#832EC5" fillOpacity={0} strokeStyle="solid" />
                    ) : (
                        <Circle center={[point.x, 0]} radius={0.15} color="#832EC5" fillOpacity={1} />
                    )}
                    <g opacity={0.01}>{point.element}</g>
                </Mafs>
            </div>
        </div>
    );
};
