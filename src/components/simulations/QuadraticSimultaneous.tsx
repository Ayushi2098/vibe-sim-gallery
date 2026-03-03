import React, { useState } from 'react';
import { Mafs, Coordinates, Plot, Point, LaTeX } from 'mafs';
import { Latex } from '../Latex';
import 'mafs/core.css';

export const QuadraticSimultaneous: React.FC = () => {
    // Parabola: y = x^2 - 2
    // Line: y = mx + c

    const [m, setM] = useState(1);
    const [c, setC] = useState(0);

    const formatNumber = (num: number) => Number(num.toFixed(2));

    // Intersection logic
    const discriminant = m * m + 4 * (2 + c);
    const hasTwoSolutions = discriminant > 0.001;
    const hasOneSolution = Math.abs(discriminant) <= 0.001;
    // const hasNoSolutions = discriminant < -0.001; // Not used but good to know

    let solutions: { x: number, y: number }[] = [];
    if (hasTwoSolutions) {
        const x1 = (m - Math.sqrt(discriminant)) / 2;
        const x2 = (m + Math.sqrt(discriminant)) / 2;
        solutions.push({ x: x1, y: m * x1 + c });
        solutions.push({ x: x2, y: m * x2 + c });
    } else if (hasOneSolution) {
        const x1 = m / 2;
        solutions.push({ x: x1, y: m * x1 + c });
    }

    return (
        <div style={{ padding: '4px', color: '#f8fafc' }}>
            <div style={{ marginBottom: '10px', background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
                <div style={{ flex: '1', marginRight: '20px' }}>
                    <div style={{ fontSize: '1.2em', fontFamily: 'monospace', marginTop: '5px' }}>
                        <span style={{ color: '#832EC5' }}><Latex>y = x^2 - 2</Latex></span>
                        <span style={{ margin: '0 10px' }}>&</span>
                        <span style={{ color: '#FFC700' }}><Latex>{`y = ${m}x ${c >= 0 ? '+' : ''} ${c}`}</Latex></span>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.9em', marginBottom: '2px' }}>Slope (m): {m}</label>
                        <input
                            type="range"
                            min="-5"
                            max="5"
                            step="0.5"
                            value={m}
                            onChange={(e) => setM(parseFloat(e.target.value))}
                            style={{ width: '100px' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.9em', marginBottom: '2px' }}>Intercept (c): {c}</label>
                        <input
                            type="range"
                            min="-10"
                            max="10"
                            step="1"
                            value={c}
                            onChange={(e) => setC(parseInt(e.target.value))}
                            style={{ width: '100px' }}
                        />
                    </div>
                </div>
            </div>

            <div style={{ height: '800px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', overflow: 'hidden', background: '#0f172a', position: 'relative' }}>
                <Mafs
                    height={800}
                    viewBox={{ x: [-10, 10], y: [-10, 10] }}
                    preserveAspectRatio={false}
                >
                    <Coordinates.Cartesian />

                    {/* Parabola: y = x^2 - 2 */}
                    <Plot.OfX
                        y={(x) => x * x - 2}
                        color="#832EC5"
                        weight={3}
                    />

                    {/* Line: y = mx + c */}
                    <Plot.OfX
                        y={(x) => m * x + c}
                        color="#FFC700"
                        weight={3}
                    />

                    {/* Intersection Points */}
                    {solutions.map((pt, i) => (
                        <React.Fragment key={i}>
                            <Point x={pt.x} y={pt.y} color="#FFE999" />
                            <LaTeX at={[pt.x, pt.y + 0.8]} tex={`(${formatNumber(pt.x)}, ${formatNumber(pt.y)})`} color="#FFE999" />
                        </React.Fragment>
                    ))}
                </Mafs>

                <div style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    padding: '8px 16px',
                    background: hasTwoSolutions ? 'rgba(34, 197, 94, 0.9)' : hasOneSolution ? 'rgba(234, 179, 8, 0.9)' : 'rgba(239, 68, 68, 0.9)',
                    color: 'white',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                    {hasTwoSolutions ? "2 Solutions" : hasOneSolution ? "1 Solution" : "No Solutions"}
                </div>
            </div>
        </div>
    );
};
