import React from 'react';
import type { Simulation } from '@/lib/types';
import { Latex } from './Latex';
import './SimulationTile.css';

interface SimulationTileProps {
    simulation: Simulation;
    onClick: () => void;
}

export const SimulationTile: React.FC<SimulationTileProps> = ({ simulation, onClick }) => {
    // Helper to render title with mixed text and latex
    const renderTitle = (title: string) => {
        const parts = title.split(/(\$[^\$]+\$)/g);
        return parts.map((part, i) => {
            if (part.startsWith('$') && part.endsWith('$')) {
                return <Latex key={i}>{part.slice(1, -1)}</Latex>; // Strip $
            }
            return <span key={i}>{part}</span>;
        });
    };

    return (
        <div className="simulation-tile" onClick={onClick}>
            <div className="tile-background"></div>
            <div className="tile-content">
                {simulation.skillCode && (
                    <div className="skill-code">{simulation.skillCode}</div>
                )}
                <h3 className="tile-title">{renderTitle(simulation.title)}</h3>
            </div>
            <div className="tile-hover-gradient"></div>
        </div>
    );
};
