import React, { useState, useMemo } from 'react';
import type { Simulation } from '@/lib/types';
import { TopicGroup } from './TopicGroup';
import { getSimulationsByTopic } from '@/data/simulations';
import './TileGrid.css';

interface TileGridProps {
    simulations: Simulation[];
    onSimulationClick: (simulation: Simulation) => void;
}

export const TileGrid: React.FC<TileGridProps> = ({ onSimulationClick }) => {
    const [searchQuery, setSearchQuery] = useState('');

    // Get simulations grouped by topic
    const topicGroups = useMemo(() => getSimulationsByTopic(), []);

    // Filter simulations across all groups
    const filteredGroups = useMemo(() => {
        if (!searchQuery.trim()) {
            return topicGroups;
        }

        const query = searchQuery.toLowerCase();
        return topicGroups
            .map(group => ({
                ...group,
                simulations: group.simulations.filter(sim => {
                    const matchesTitle = sim.title.toLowerCase().includes(query);
                    const matchesCode = sim.skillCode?.toLowerCase().includes(query) || false;
                    return matchesTitle || matchesCode;
                })
            }))
            .filter(group => group.simulations.length > 0);
    }, [topicGroups, searchQuery]);

    const isSearching = searchQuery.trim().length > 0;

    return (
        <div className="tile-grid-container">
            <header className="grid-header">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search by Skill Name or Code..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                </div>
            </header>

            <div className="topic-groups-container">
                {filteredGroups.map((group) => (
                    <TopicGroup
                        key={group.name}
                        topicName={group.name}
                        simulations={group.simulations}
                        onSimulationClick={onSimulationClick}
                        defaultExpanded={isSearching}
                    />
                ))}
            </div>

            {filteredGroups.length === 0 && (
                <div className="no-results">
                    <p>No simulations found matching "{searchQuery}"</p>
                </div>
            )}
        </div>
    );
};
