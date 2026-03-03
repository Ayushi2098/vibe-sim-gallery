import React, { useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface LatexProps {
    children: string;
    displayMode?: boolean;
    className?: string; // Allow custom styling
}

export const Latex: React.FC<LatexProps> = ({ children, displayMode = false, className = '' }) => {
    const spanRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (spanRef.current) {
            try {
                katex.render(children, spanRef.current, {
                    throwOnError: false, // Render formatted error message on error
                    displayMode,
                });
            } catch (error) {
                console.error("KaTeX rendering error:", error);
                spanRef.current.textContent = children; // Fallback to plain text
            }
        }
    }, [children, displayMode]);

    return <span ref={spanRef} className={className} />;
};
