import React, { useState } from 'react';

interface InfoTooltipProps {
    text: string;
}

export const InfoTooltip: React.FC<InfoTooltipProps> = ({ text }) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div
            style={{
                position: 'relative',
                display: 'inline-block',
                flexShrink: 0
            }}
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            <button
                type="button"
                style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    border: '1.5px solid #94a3b8',
                    background: 'rgba(148, 163, 184, 0.15)',
                    color: '#cbd5e1',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    cursor: 'help',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 0,
                    transition: 'all 0.2s ease',
                    fontFamily: 'monospace',
                    outline: 'none'
                }}
                onMouseOver={(e) => {
                    e.currentTarget.style.background = 'rgba(148, 163, 184, 0.3)';
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.color = '#f8fafc';
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.background = 'rgba(148, 163, 184, 0.15)';
                    e.currentTarget.style.borderColor = '#94a3b8';
                    e.currentTarget.style.color = '#cbd5e1';
                }}
            >
                ?
            </button>
            {isVisible && (
                <div
                    style={{
                        position: 'absolute',
                        top: '100%',
                        left: '50%',
                        transform: 'translate(-50%, 10px)',
                        padding: '8px 12px',
                        background: 'rgba(15, 23, 42, 0.95)',
                        border: '1px solid rgba(148, 163, 184, 0.2)',
                        borderRadius: '6px',
                        fontSize: '0.85rem',
                        color: '#f1f5f9',
                        whiteSpace: 'normal',
                        zIndex: 1000,
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                        backdropFilter: 'blur(8px)',
                        pointerEvents: 'none',
                        fontStyle: 'normal',
                        width: 'max-content',
                        maxWidth: '280px',
                        textAlign: 'center',
                        lineHeight: '1.4',
                        marginBottom: '0'
                    }}
                >
                    {text}
                    {/* Arrow pointing up */}
                    <div style={{
                        position: 'absolute',
                        bottom: '100%',
                        left: '50%',
                        marginLeft: '-5px',
                        borderWidth: '5px',
                        borderStyle: 'solid',
                        borderColor: 'transparent transparent rgba(15, 23, 42, 0.95) transparent'
                    }} />
                </div>
            )}
        </div>
    );
};
