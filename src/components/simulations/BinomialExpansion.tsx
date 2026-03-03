import React, { useState } from 'react';
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

export const BinomialExpansion: React.FC = () => {
    const [n, setN] = useState(3);

    // Expand (a+b)^n
    const generateExpansion = (power: number) => {
        const terms = [];
        for (let k = 0; k <= power; k++) {
            const coeff = nCr(power, k);
            const aPower = power - k;
            const bPower = k;

            let termStr = '';

            // Coefficient
            if (coeff > 1) termStr += coeff;

            // a part
            if (aPower > 0) {
                termStr += 'a';
                if (aPower > 1) termStr += `^${aPower}`;
            }

            // b part
            if (bPower > 0) {
                termStr += 'b';
                if (bPower > 1) termStr += `^${bPower}`;
            }

            terms.push(termStr);
        }
        return terms.join(' + ');
    };

    return (
        <div style={{ padding: '4px' }}>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '8px' }}>
                <div style={{ fontSize: '1.2em', fontFamily: 'monospace', marginBottom: '10px' }}>
                    <Latex>{`(a + b)^${n}`}</Latex>
                </div>

                <div style={{ padding: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', fontSize: '1.2em', lineHeight: '1.6' }}>
                    <Latex>{`= ${generateExpansion(n)}`}</Latex>
                </div>

                <div style={{ marginTop: '20px' }}>
                    <label>Power (n): {n}</label>
                    <input type="range" min="0" max="8" value={n} onChange={e => setN(Number(e.target.value))} style={{ width: '100%', accentColor: '#832EC5' }} />
                </div>
            </div>
        </div>
    );
};
