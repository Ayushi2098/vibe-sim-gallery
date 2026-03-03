import { Latex } from '../Latex';

import { Mafs, Coordinates, useMovablePoint, LaTeX, Line, Polygon } from 'mafs';
import 'mafs/core.css';

export const Distance: React.FC = () => {
    const p1 = useMovablePoint([-3, -1], { color: '#832EC5' });
    const p2 = useMovablePoint([2, 3], { color: '#832EC5' });

    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    return (
        <div style={{ padding: '4px' }}>


            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '8px', marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '1.2em', fontFamily: 'monospace' }}>
                    <Latex>{`d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}`}</Latex>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ marginBottom: '5px' }}>
                        <Latex>{`\\Delta x = ${Math.abs(dx).toFixed(2)}`}</Latex> &nbsp;|&nbsp;
                        <Latex>{`\\Delta y = ${Math.abs(dy).toFixed(2)}`}</Latex>
                    </div>
                    <div style={{ color: '#AB5DDC', fontWeight: 'bold' }}>
                        Distance: <Latex>{`${distance.toFixed(2)}`}</Latex>
                    </div>
                </div>
            </div>

            <div style={{ height: '800px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', overflow: 'hidden', background: '#0a0a0a' }}>
                <Mafs height={800}>
                    <Coordinates.Cartesian />
                    <Polygon
                        points={[[p1.x, p1.y], [p2.x, p1.y], [p2.x, p2.y]]}
                        color="#832EC5"
                        fillOpacity={0.1}
                        strokeOpacity={0}
                    />
                    <Line.Segment point1={[p1.x, p1.y]} point2={[p2.x, p2.y]} color="#AB5DDC" />
                    <Line.Segment point1={[p1.x, p1.y]} point2={[p2.x, p1.y]} color="#832EC5" style="dashed" />
                    <Line.Segment point1={[p2.x, p1.y]} point2={[p2.x, p2.y]} color="#832EC5" style="dashed" />
                    <LaTeX at={[(p1.x + p2.x) / 2, p1.y - 0.4]} tex="\Delta x" color="#832EC5" />
                    <LaTeX at={[p2.x + 0.5, (p1.y + p2.y) / 2]} tex="\Delta y" color="#832EC5" />
                    <LaTeX at={[(p1.x + p2.x) / 2 - 0.3, (p1.y + p2.y) / 2 + 0.3]} tex="d" color="#AB5DDC" />
                    {p1.element}
                    {p2.element}
                </Mafs>
            </div>
        </div>
    );
};
