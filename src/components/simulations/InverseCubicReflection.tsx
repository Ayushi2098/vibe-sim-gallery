import React from 'react';
import { Mafs, Coordinates, Plot, useMovablePoint, LaTeX } from 'mafs';
import { Latex } from '../Latex';
import 'mafs/core.css';

export const InverseCubicReflection: React.FC = () => {
    // Center point (h, k)
    const center = useMovablePoint([1, 1], { color: '#832EC5' });
    const h = center.x;
    const k = center.y;
    const a = 0.5; // Fixed scale for simplicity

    // Generic function string helpers for LaTeX
    const fmt = (n: number) => n >= 0 ? `+ ${n.toFixed(1)}` : `- ${Math.abs(n).toFixed(1)}`;
    const fmtInv = (n: number) => n >= 0 ? `- ${n.toFixed(1)}` : `+ ${Math.abs(n).toFixed(1)}`;

    return (
        <div style={{ padding: '4px', color: '#f8fafc' }}>
            <div style={{ marginBottom: '10px', background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '8px' }}>
                <p style={{ marginBottom: '10px' }}>
                    To find the inverse, <strong>swap x and y</strong>, then make y the subject.
                </p>

                <div style={{ fontFamily: 'monospace', fontSize: '1.1em', lineHeight: '1.6' }}>
                    <div style={{ color: '#832EC5' }}>
                        <strong>Step 1: Original Function</strong><br />
                        <Latex>{`y = ${a}(x ${fmt(-h)})^3 ${fmt(k)}`}</Latex>
                    </div>
                    <div style={{ margin: '10px 0', borderLeft: '2px solid rgba(255,255,255,0.2)', paddingLeft: '10px' }}>
                        <div><strong>Step 2: Swap Variables</strong></div>
                        <Latex>{`x = ${a}(y ${fmt(-h)})^3 ${fmt(k)}`}</Latex>
                    </div>
                    <div style={{ margin: '10px 0', borderLeft: '2px solid rgba(255,255,255,0.2)', paddingLeft: '10px' }}>
                        <div><strong>Step 3: Rearrange for y</strong></div>
                        <Latex>{`x ${fmtInv(k)} = ${a}(y ${fmt(-h)})^3`}</Latex><br />
                        <Latex>{`\\frac{x ${fmtInv(k)}}{${a}} = (y ${fmt(-h)})^3`}</Latex><br />
                        <Latex>{`\\sqrt[3]{\\frac{x ${fmtInv(k)}}{${a}}} = y ${fmt(-h)}`}</Latex><br />
                    </div>
                    <div style={{ color: '#FFC700' }}>
                        <strong>Step 4: Inverse Function</strong><br />
                        <Latex>{`f^{-1}(x) = \\sqrt[3]{2(x ${fmtInv(k)})} ${fmt(h)}`}</Latex>
                    </div>
                </div>
            </div>

            <div style={{ height: '800px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', overflow: 'hidden' }}>
                <Mafs height={800}>
                    <Coordinates.Cartesian />

                    {/* Line of Symmetry */}
                    <Plot.OfX y={(x) => x} color="rgba(255,255,255,0.2)" style="dashed" />

                    {/* Original Cubic y = a(x-h)^3 + k */}
                    <Plot.OfX y={(x) => a * Math.pow(x - h, 3) + k} color="#832EC5" />
                    <LaTeX at={[h - 2, k + 2]} tex="f(x)" color="#832EC5" />

                    {/* Inverse cubic: y = cbrt((x-k)/a) + h */}
                    <Plot.OfX y={(x) => Math.cbrt((x - k) / a) + h} color="#FFC700" />
                    <LaTeX at={[k + 2, h - 2]} tex="f^{-1}(x)" color="#FFC700" />

                    {/* Center Point */}
                    {center.element}
                    <LaTeX at={[h, k + 0.5]} tex="\text{Inflection } (h,k)" color="#832EC5" />

                </Mafs>
            </div>
        </div>
    );
};
