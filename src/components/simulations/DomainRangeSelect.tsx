import React from 'react';
import { Mafs, Coordinates, useMovablePoint, LaTeX, Line } from 'mafs';
import { Latex } from '../Latex';
import 'mafs/core.css';

export const DomainRangeSelect: React.FC = () => {
    const p1 = useMovablePoint([-3, -2], { color: '#832EC5' });
    const p2 = useMovablePoint([2, 3], { color: '#832EC5' });

    const minX = Math.min(p1.x, p2.x);
    const maxX = Math.max(p1.x, p2.x);

    // For a line segment, range is between the y-values of the endpoints
    const minY = Math.min(p1.y, p2.y);
    const maxY = Math.max(p1.y, p2.y);

    return (
        <div style={{ padding: '4px' }}>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '8px', marginBottom: '15px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                    <div style={{ color: '#AB5DDC', fontWeight: 'bold', marginBottom: '5px' }}>Domain (x-projection)</div>
                    <div style={{ fontSize: '1.2em' }}>
                        <Latex>{`\\{ x \\mid ${minX.toFixed(1)} \\le x \\le ${maxX.toFixed(1)} \\}`}</Latex>
                    </div>
                </div>
                <div>
                    <div style={{ color: '#ec4899', fontWeight: 'bold', marginBottom: '5px' }}>Range (y-projection)</div>
                    <div style={{ fontSize: '1.2em' }}>
                        <Latex>{`\\{ y \\mid ${minY.toFixed(1)} \\le y \\le ${maxY.toFixed(1)} \\}`}</Latex>
                    </div>
                </div>
            </div>

            <div style={{ height: '800px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', overflow: 'hidden', background: '#0a0a0a' }}>
                <Mafs height={800} viewBox={{ x: [-5, 5], y: [-5, 5] }}>
                    <Coordinates.Cartesian />

                    {/* Domain highlight on X-axis */}
                    <Line.Segment point1={[minX, 0]} point2={[maxX, 0]} color="#AB5DDC" weight={6} />
                    <LaTeX at={[(minX + maxX) / 2, -0.5]} tex="\text{Domain}" color="#AB5DDC" />

                    {/* Range highlight on Y-axis */}
                    <Line.Segment point1={[0, minY]} point2={[0, maxY]} color="#ec4899" weight={6} />
                    <LaTeX at={[-0.8, (minY + maxY) / 2]} tex="\text{Range}" color="#ec4899" />

                    {/* The Line Segment */}
                    <Line.Segment point1={[p1.x, p1.y]} point2={[p2.x, p2.y]} color="#832EC5" weight={3} />

                    {/* Projection dashed lines */}
                    <Line.Segment point1={[p1.x, p1.y]} point2={[p1.x, 0]} color="#AB5DDC" style="dashed" opacity={0.4} />
                    <Line.Segment point1={[p2.x, p2.y]} point2={[p2.x, 0]} color="#AB5DDC" style="dashed" opacity={0.4} />
                    <Line.Segment point1={[p1.x, p1.y]} point2={[0, p1.y]} color="#ec4899" style="dashed" opacity={0.4} />
                    <Line.Segment point1={[p2.x, p2.y]} point2={[0, p2.y]} color="#ec4899" style="dashed" opacity={0.4} />

                    {p1.element}
                    {p2.element}
                </Mafs>
            </div>
        </div>
    );
};
