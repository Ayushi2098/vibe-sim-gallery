import React, { useState } from 'react';
import { Mafs, LaTeX, Polygon } from 'mafs';
import { Latex } from '../Latex';

import 'mafs/core.css';

// Helper for combinations nCk
const nCr = (n: number, r: number): number => {
    if (r < 0 || r > n) return 0;
    if (r === 0 || r === n) return 1;
    if (r > n / 2) r = n - r;
    let res = 1;
    for (let i = 1; i <= r; i++) {
        res = res * (n - i + 1) / i;
    }
    return res;
};

export const PascalsTriangle: React.FC = () => {
    const [highlightRow, setHighlightRow] = useState(3);
    const rows = 6;

    return (
        <div style={{ padding: '4px', color: '#f8fafc' }}>
            <div style={{ marginBottom: '10px', background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '8px' }}>

                <div style={{ fontSize: '1.2em', marginBottom: '15px' }}>
                    Highlighting Row n = {highlightRow} (Coefficients for <Latex>{`(a+b)^{${highlightRow}}`}</Latex>)
                </div>
                <input type="range" min="0" max={rows - 1} value={highlightRow} onChange={e => setHighlightRow(Number(e.target.value))} style={{ width: '100%', accentColor: '#832EC5' }} />
            </div>

            <div style={{ height: '800px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', overflow: 'hidden' }}>
                <Mafs viewBox={{ x: [-6, 6], y: [0, 7] }} preserveAspectRatio={false}>
                    {Array.from({ length: rows }).map((_, r) => {
                        const count = r + 1;
                        const startX = -(count - 1); // Spacing 2 units: 0, -1/1, -2/0/2
                        const y = rows - r;

                        return Array.from({ length: count }).map((_, i) => {
                            const val = nCr(r, i);
                            const x = startX + i * 2;
                            const isHighlighted = r === highlightRow;

                            return (
                                <React.Fragment key={`${r}-${i}`}>
                                    {isHighlighted && (
                                        <Polygon
                                            points={[
                                                [x, y + 0.5],
                                                [x + 1, y - 0.5],
                                                [x, y - 1.5],
                                                [startX + i * 2 - 1, y - 0.5]
                                            ]}
                                            color="#832EC5"
                                            fillOpacity={0.3}
                                            strokeOpacity={0}
                                        />
                                    )}
                                    <LaTeX at={[x, y - 0.5]} tex={val.toString()} color={isHighlighted ? "#832EC5" : "#f8fafc"} />
                                </React.Fragment>
                            );
                        });
                    })}
                </Mafs>
            </div>
        </div>
    );
};
