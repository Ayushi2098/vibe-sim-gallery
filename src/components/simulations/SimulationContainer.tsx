import React from 'react';
import { Mafs } from 'mafs';
import 'mafs/core.css';


interface SimulationContainerProps {
    title: string;
    subtitle?: React.ReactNode;
    description?: React.ReactNode; // Deprecated, use tooltip instead
    tooltip?: string; // Hover tooltip text
    children: React.ReactNode; // For Mafs components
    height?: number;
    viewBox?: { x: [number, number], y: [number, number] };
    preserveAspectRatio?: false | "contain";
    controls?: React.ReactNode;
    infoPanel?: React.ReactNode;
}

export const SimulationContainer: React.FC<SimulationContainerProps> = ({
    title: _title,
    subtitle,
    description,
    tooltip: _tooltip,
    children,
    height = 800,
    viewBox,
    preserveAspectRatio,
    controls,
    infoPanel
}) => {
    return (
        <div style={{ padding: '4px', color: '#f8fafc', display: 'flex', flexDirection: 'column', gap: '10px', height: '100%' }}>
            {/* Header Section */}
            {/* Header Section - Title/Tooltip now handled by Wrapper */}
            {(subtitle || description) && (
                <div style={{
                    position: 'relative',
                    background: 'rgba(255,255,255,0.05)',
                    padding: '8px 11px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    flexShrink: 0
                }}>
                    {subtitle && <div style={{ marginBottom: description ? '6px' : '0' }}>{subtitle}</div>}
                    {description && (
                        <p style={{ fontSize: '0.78em', color: '#94a3b8', margin: 0, fontStyle: 'italic', lineHeight: 1.25 }}>
                            {description}
                        </p>
                    )}
                </div>
            )}

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', flex: 1, minHeight: 0 }}>
                {/* Main Content Area */}
                <div style={{
                    flex: '1 1 600px',
                    height: '100%',
                    minHeight: height ? `${height}px` : '400px', // Fallback minimum height
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    background: '#0a0a0a',
                    position: 'relative'
                }}>
                    <Mafs
                        height={height}
                        viewBox={viewBox}
                        preserveAspectRatio={preserveAspectRatio}
                    >
                        {children}
                    </Mafs>
                </div>

                {/* Optional Side Panel (Info/Controls) */}
                {(infoPanel || controls) && (
                    <div style={{
                        flex: '0 0 300px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px'
                    }}>
                        {controls && (
                            <div style={{
                                background: 'rgba(255,255,255,0.05)',
                                padding: '16px',
                                borderRadius: '12px',
                                border: '1px solid rgba(255,255,255,0.1)'
                            }}>
                                {controls}
                            </div>
                        )}
                        {infoPanel && (
                            <div style={{
                                background: 'rgba(255,255,255,0.03)',
                                padding: '16px',
                                borderRadius: '12px',
                                border: '1px solid rgba(255,255,255,0.1)'
                            }}>
                                {infoPanel}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
