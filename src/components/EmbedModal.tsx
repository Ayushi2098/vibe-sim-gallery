import React, { useState, useCallback } from 'react';
import './EmbedModal.css';

interface EmbedModalProps {
    simId: string;
    simTitle: string;
    onClose: () => void;
}

const PRESET_SIZES = [
    { label: 'Small', width: 640, height: 480 },
    { label: 'Medium', width: 800, height: 600 },
    { label: 'Large', width: 1024, height: 768 },
    { label: 'Full Width', width: 100, height: 600, isPercent: true },
];

export const EmbedModal: React.FC<EmbedModalProps> = ({ simId, simTitle, onClose }) => {
    const [width, setWidth] = useState(800);
    const [height, setHeight] = useState(600);
    const [usePercent, setUsePercent] = useState(false);
    const [copied, setCopied] = useState(false);
    const [activePreset, setActivePreset] = useState<string>('Medium');

    const baseUrl = `${window.location.origin}${window.location.pathname}#/sim/${simId}`;
    const widthAttr = usePercent ? '100%' : `${width}`;
    const embedCode = `<iframe\n  src="${baseUrl}"\n  width="${widthAttr}"\n  height="${height}"\n  frameborder="0"\n  style="border-radius:12px;border:1px solid rgba(255,255,255,0.12);"\n  allowfullscreen\n  title="${simTitle}"\n></iframe>`;

    const handleCopy = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(embedCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // fallback
            const el = document.createElement('textarea');
            el.value = embedCode;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    }, [embedCode]);

    const applyPreset = (preset: typeof PRESET_SIZES[0]) => {
        setActivePreset(preset.label);
        setWidth(preset.width);
        setHeight(preset.height);
        setUsePercent(!!preset.isPercent);
    };

    return (
        <div className="embed-overlay" onClick={onClose}>
            <div className="embed-modal" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="embed-header">
                    <div className="embed-header-left">
                        <div className="embed-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="16 18 22 12 16 6" />
                                <polyline points="8 6 2 12 8 18" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="embed-title">Embed Simulation</h3>
                            <p className="embed-subtitle">{simTitle}</p>
                        </div>
                    </div>
                    <button className="embed-close" onClick={onClose} aria-label="Close embed modal">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Size Presets */}
                <div className="embed-section">
                    <label className="embed-label">Size Preset</label>
                    <div className="embed-presets">
                        {PRESET_SIZES.map(preset => (
                            <button
                                key={preset.label}
                                className={`embed-preset-btn${activePreset === preset.label ? ' active' : ''}`}
                                onClick={() => applyPreset(preset)}
                            >
                                {preset.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Custom Size */}
                <div className="embed-section">
                    <label className="embed-label">Custom Size</label>
                    <div className="embed-dimensions">
                        <div className="embed-dim-group">
                            <span className="dim-label">Width</span>
                            <div className="dim-input-wrap">
                                <input
                                    type="number"
                                    className="dim-input"
                                    value={width}
                                    min={200}
                                    max={3840}
                                    onChange={e => { setWidth(Number(e.target.value)); setActivePreset(''); }}
                                    disabled={usePercent}
                                />
                                <span className="dim-unit">{usePercent ? '%' : 'px'}</span>
                            </div>
                            <label className="dim-percent-toggle">
                                <input
                                    type="checkbox"
                                    checked={usePercent}
                                    onChange={e => { setUsePercent(e.target.checked); setActivePreset(''); }}
                                />
                                <span>100% width</span>
                            </label>
                        </div>
                        <div className="dim-separator">×</div>
                        <div className="embed-dim-group">
                            <span className="dim-label">Height</span>
                            <div className="dim-input-wrap">
                                <input
                                    type="number"
                                    className="dim-input"
                                    value={height}
                                    min={200}
                                    max={2160}
                                    onChange={e => { setHeight(Number(e.target.value)); setActivePreset(''); }}
                                />
                                <span className="dim-unit">px</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Code Block */}
                <div className="embed-section">
                    <label className="embed-label">Embed Code</label>
                    <div className="embed-code-wrap">
                        <pre className="embed-code">{embedCode}</pre>
                        <button
                            className={`embed-copy-btn${copied ? ' copied' : ''}`}
                            onClick={handleCopy}
                            aria-label="Copy embed code"
                        >
                            {copied ? (
                                <>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                    Copied!
                                </>
                            ) : (
                                <>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                        <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                                    </svg>
                                    Copy Code
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Direct Link */}
                <div className="embed-section">
                    <label className="embed-label">Direct Link</label>
                    <div className="embed-link-wrap">
                        <input
                            className="embed-link-input"
                            readOnly
                            value={baseUrl}
                            onFocus={e => e.target.select()}
                        />
                        <button
                            className="embed-link-open"
                            onClick={() => window.open(baseUrl, '_blank')}
                            title="Open in new tab"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                                <polyline points="15 3 21 3 21 9" />
                                <line x1="10" y1="14" x2="21" y2="3" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
