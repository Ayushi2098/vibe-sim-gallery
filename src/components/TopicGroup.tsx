import React, { useState } from 'react';
import type { Simulation } from '@/lib/types';
import { SimulationTile } from './SimulationTile';
import './TopicGroup.css';

interface TopicGroupProps {
    topicName: string;
    simulations: Simulation[];
    onSimulationClick: (simulation: Simulation) => void;
    defaultExpanded?: boolean;
}

export const TopicGroup: React.FC<TopicGroupProps> = ({
    topicName,
    simulations,
    onSimulationClick,
    defaultExpanded = false
}) => {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);

    return (
        <div className={`topic-group ${isExpanded ? 'expanded' : 'collapsed'}`}>
            <button
                className="topic-header"
                onClick={() => setIsExpanded(!isExpanded)}
                aria-expanded={isExpanded}
            >
                <span className="toggle-arrow">{isExpanded ? '▼' : '▶'}</span>
                <span className="topic-name">{topicName}</span>
                <span className="topic-count">({simulations.length})</span>
            </button>

            <div className="topic-content">
                <div className="topic-tiles">
                    {simulations.map((sim) => (
                        <SimulationTile
                            key={sim.id}
                            simulation={sim}
                            onClick={() => onSimulationClick(sim)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
