
import React, { useState } from 'react';
import { Latex } from '../Latex';

export const MatrixOperations: React.FC = () => {


    // 2x2 Matrices A and B
    const [a, setA] = useState([1, 2, 3, 4]);
    const [b, setB] = useState([5, 6, 7, 8]);
    const [k, setK] = useState(2);
    const [operation, setOperation] = useState<'add' | 'sub' | 'scale'>('add');

    const updateA = (index: number, val: string) => {
        const newA = [...a];
        newA[index] = Number(val);
        setA(newA);
    };

    const updateB = (index: number, val: string) => {
        const newB = [...b];
        newB[index] = Number(val);
        setB(newB);
    };

    const getResult = () => {
        if (operation === 'add') {
            return a.map((val, i) => val + b[i]);
        }
        if (operation === 'sub') {
            return a.map((val, i) => val - b[i]);
        }
        if (operation === 'scale') {
            return a.map(val => k * val);
        }
        return [];
    };

    const result = getResult();

    const inputStyle = {
        width: '40px',
        textAlign: 'center' as const,
        background: 'rgba(255,255,255,0.1)',
        color: '#f8fafc',
        border: '1px solid rgba(255,255,255,0.2)',
        borderRadius: '4px',
        padding: '5px'
    };

    const MatrixBox = ({ values, onChange, readOnly = false }: { values: number[], onChange?: (i: number, v: string) => void, readOnly?: boolean }) => (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px', background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '8px' }}>
            {values.map((val, i) => (
                <input
                    key={i}
                    type="number"
                    value={val}
                    readOnly={readOnly}
                    onChange={e => onChange?.(i, e.target.value)}
                    style={inputStyle}
                />
            ))}
        </div>
    );

    return (
        <div style={{ padding: '4px', color: '#f8fafc' }}>
            <div style={{ marginBottom: '10px', background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '8px' }}>

                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                    <button
                        onClick={() => setOperation('add')}
                        style={{ padding: '8px 16px', background: operation === 'add' ? '#832EC5' : 'rgba(255,255,255,0.1)', color: '#f8fafc', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        Add A + B
                    </button>
                    <button
                        onClick={() => setOperation('sub')}
                        style={{ padding: '8px 16px', background: operation === 'sub' ? '#832EC5' : 'rgba(255,255,255,0.1)', color: '#f8fafc', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        Subtract A - B
                    </button>
                    <button
                        onClick={() => setOperation('scale')}
                        style={{ padding: '8px 16px', background: operation === 'scale' ? '#832EC5' : 'rgba(255,255,255,0.1)', color: '#f8fafc', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        Scale kA
                    </button>
                </div>

                {operation === 'scale' && (
                    <div style={{ marginBottom: '10px' }}>
                        <label>Scalar k = {k}</label>
                        <input type="range" min="-5" max="5" value={k} onChange={e => setK(Number(e.target.value))} style={{ marginLeft: '10px', accentColor: '#832EC5' }} />
                    </div>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', fontSize: '1.2em' }}>
                    {/* Matrix A */}
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ marginBottom: '5px' }}>A</div>
                        <MatrixBox values={a} onChange={updateA} />
                    </div>

                    <div style={{ fontWeight: 'bold' }}>
                        {operation === 'add' ? '+' : operation === 'sub' ? '-' : ''}
                    </div>

                    {/* Matrix B (only for add/sub) */}
                    {operation !== 'scale' && (
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ marginBottom: '5px' }}>B</div>
                            <MatrixBox values={b} onChange={updateB} />
                        </div>
                    )}

                    {operation === 'scale' && (
                        <div style={{ fontWeight: 'bold' }}>
                            (with k={k})
                        </div>
                    )}

                    <div style={{ fontWeight: 'bold' }}>=</div>

                    {/* Result Matrix */}
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ marginBottom: '5px', color: '#832EC5' }}>Result</div>
                        <MatrixBox values={result} readOnly />
                    </div>
                </div>

                <div style={{ marginTop: '30px', background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <h4 style={{ margin: '0 0 10px 0', color: '#94a3b8', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Calculation</h4>
                    <div style={{ fontFamily: 'monospace' }}>
                        {operation === 'add' && <Latex>{`\\begin{pmatrix} ${a[0]} & ${a[1]} \\\\ ${a[2]} & ${a[3]} \\end{pmatrix} + \\begin{pmatrix} ${b[0]} & ${b[1]} \\\\ ${b[2]} & ${b[3]} \\end{pmatrix} = \\begin{pmatrix} ${a[0]} +${b[0]} & ${a[1]} +${b[1]} \\\\ ${a[2]} +${b[2]} & ${a[3]} +${b[3]} \\end{pmatrix} `}</Latex>}
                        {operation === 'sub' && <Latex>{`\\begin{pmatrix} ${a[0]} & ${a[1]} \\\\ ${a[2]} & ${a[3]} \\end{pmatrix} - \\begin{pmatrix} ${b[0]} & ${b[1]} \\\\ ${b[2]} & ${b[3]} \\end{pmatrix} = \\begin{pmatrix} ${a[0]} -${b[0]} & ${a[1]} -${b[1]} \\\\ ${a[2]} -${b[2]} & ${a[3]} -${b[3]} \\end{pmatrix} `}</Latex>}
                        {operation === 'scale' && <Latex>{`${k} \\cdot \\begin{pmatrix} ${a[0]} & ${a[1]} \\\\ ${a[2]} & ${a[3]} \\end{pmatrix} = \\begin{pmatrix} ${k} \\cdot${a[0]} & ${k} \\cdot${a[1]} \\\\ ${k} \\cdot${a[2]} & ${k} \\cdot${a[3]} \\end{pmatrix} `}</Latex>}
                    </div>
                </div>
            </div>
        </div>
    );
};
