import React, { useState } from 'react';
import { Coordinates, Plot, Point, LaTeX } from 'mafs';
import { Latex } from '../Latex';
import { SimulationContainer } from './SimulationContainer';

export const FormulaicPattern: React.FC = () => {
    const [nVal, setNVal] = useState(1);

    // Pattern: T(n) = n^2 + 1
    const func = (n: number) => n * n + 1;
    const formulaText = "T(n) = n^2 + 1";

    // Show first 6 terms
    const terms = Array.from({ length: 6 }, (_, i) => {
        const n = i + 1;
        return { n, val: func(n) };
    });

    return (
        <SimulationContainer
            title="Formulaic Pattern"
            tooltip="Adjust the slider to see how the formula calculates specific terms in the sequence."
            subtitle={
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '30px',
                    marginTop: '10px',
                    padding: '12px',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.05)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '0.9em', color: '#94a3b8' }}>Term (n):</span>
                        <input
                            type="range"
                            min="1"
                            max="10"
                            step="1"
                            value={nVal}
                            onChange={e => setNVal(Number(e.target.value))}
                            style={{ width: '150px', accentColor: '#832EC5', cursor: 'pointer' }}
                        />
                        <span style={{ minWidth: '20px', fontWeight: 'bold' }}>{nVal}</span>
                    </div>

                    <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                        <div style={{
                            background: 'rgba(168, 85, 247, 0.1)',
                            padding: '4px 12px',
                            borderRadius: '6px',
                            border: '1px solid rgba(168, 85, 247, 0.2)',
                            color: '#e9d5ff',
                            fontSize: '1em'
                        }}>
                            <Latex>{formulaText}</Latex>
                        </div>
                        <div style={{ color: '#94a3b8', fontSize: '0.9em' }}>
                            <Latex>{`T(${nVal}) = ${nVal}^2 + 1 = ${func(nVal)}`}</Latex>
                        </div>
                    </div>
                </div>
            }
            viewBox={{ x: [0, 7], y: [-10, 60] }}
            preserveAspectRatio={false}
        >
            <Coordinates.Cartesian
                xAxis={{
                    labels: (n) => (n > 0 && n <= 6) ? n.toString() : "",
                    lines: 1
                }}
                yAxis={{
                    labels: (n) => (n % 10 === 0 && n >= 0) ? n.toString() : "",
                    lines: 10
                }}
            />

            {/* Show underlying continuous function */}
            <Plot.OfX y={(x) => x * x + 1} color="#AB5DDC" opacity={0.2} style="dashed" />

            {/* Inactive terms */}
            {terms.map((t) => (
                t.n !== nVal && <Point key={t.n} x={t.n} y={t.val} color="#AB5DDC" opacity={0.5} />
            ))}

            {/* Highlighted selected term */}
            <Point x={nVal} y={func(nVal)} color="#832EC5" />
            <LaTeX
                at={[nVal, func(nVal) + 5]}
                tex={`T(${nVal}) = ${func(nVal)}`}
                color="#832EC5"
            />

        </SimulationContainer>
    );
};
