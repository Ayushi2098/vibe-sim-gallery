import { Latex } from '../Latex';

import { Mafs, Coordinates, useMovablePoint, Point, LaTeX, Line } from 'mafs';
import 'mafs/core.css';

export const Midpoint: React.FC = () => {
    const p1 = useMovablePoint([-2, -2], { color: '#832EC5' });
    const p2 = useMovablePoint([2, 2], { color: '#832EC5' });

    const midpointX = (p1.x + p2.x) / 2;
    const midpointY = (p1.y + p2.y) / 2;

    return (
        <div style={{ padding: '4px' }}>


            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '8px', marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '1.2em', fontFamily: 'monospace' }}>
                    <Latex>{`M = \\left( \\frac{x_1 + x_2}{2}, \\frac{y_1 + y_2}{2} \\right)`}</Latex>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ marginBottom: '5px' }}>
                        P1: <Latex>{`(${p1.x.toFixed(1)}, ${p1.y.toFixed(1)})`}</Latex> &nbsp;|&nbsp;
                        P2: <Latex>{`(${p2.x.toFixed(1)}, ${p2.y.toFixed(1)})`}</Latex>
                    </div>
                    <div style={{ color: '#AB5DDC', fontWeight: 'bold' }}>
                        Midpoint: <Latex>{`(${midpointX.toFixed(1)}, ${midpointY.toFixed(1)})`}</Latex>
                    </div>
                </div>
            </div>

            <div style={{ height: '800px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', overflow: 'hidden', background: '#0a0a0a' }}>
                <Mafs height={800}>
                    <Coordinates.Cartesian />
                    <Line.Segment point1={[p1.x, p1.y]} point2={[p2.x, p2.y]} color="#832EC5" opacity={0.5} style="dashed" />
                    {p1.element}
                    <LaTeX at={[p1.x, p1.y - 0.5]} tex="P_1" color="#832EC5" />
                    {p2.element}
                    <LaTeX at={[p2.x, p2.y - 0.5]} tex="P_2" color="#832EC5" />
                    <Point x={midpointX} y={midpointY} color="#AB5DDC" />
                    <LaTeX at={[midpointX, midpointY + 0.5]} tex="\text{Midpoint}" color="#AB5DDC" />
                </Mafs>
            </div>
        </div>
    );
};
