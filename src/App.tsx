import { useState, useEffect } from 'react';
import { TileGrid } from './components/TileGrid';
import { SimulationViewer } from './components/SimulationViewer';
import { simulations } from './data/simulations';
import type { Simulation } from './lib/types';

function getSimulationFromHash(): Simulation | null {
    const hash = window.location.hash; // e.g. "#/sim/sim-a029"
    const match = hash.match(/^#\/sim\/(.+)$/);
    if (!match) return null;
    const id = match[1];
    return simulations.find(s => s.id === id) || null;
}

function App() {
    const [selectedSimulation, setSelectedSimulation] = useState<Simulation | null>(
        getSimulationFromHash
    );

    // True when the page was opened directly via a sim link (e.g. opened in new tab)
    const isStandaloneMode = !!getSimulationFromHash();

    // Listen for hash changes (e.g. back/forward navigation)
    useEffect(() => {
        const onHashChange = () => {
            setSelectedSimulation(getSimulationFromHash());
        };
        window.addEventListener('hashchange', onHashChange);
        return () => window.removeEventListener('hashchange', onHashChange);
    }, []);

    const handleSimulationClick = (simulation: Simulation) => {
        // Open in a new tab with a unique URL for that simulation
        const url = `${window.location.origin}${window.location.pathname}#/sim/${simulation.id}`;
        window.open(url, '_blank');
    };

    const handleCloseViewer = () => {
        if (isStandaloneMode) {
            // In standalone mode (new tab), just close the tab
            window.close();
        } else {
            // In gallery mode, clear the hash and dismiss the overlay
            history.replaceState(null, '', window.location.pathname);
            setSelectedSimulation(null);
        }
    };

    return (
        <>
            {/* Only show the tile grid when NOT in standalone sim mode */}
            {!isStandaloneMode && (
                <TileGrid simulations={simulations} onSimulationClick={handleSimulationClick} />
            )}
            {selectedSimulation && (
                <SimulationViewer
                    simulation={selectedSimulation}
                    onClose={handleCloseViewer}
                    standalone={isStandaloneMode}
                />
            )}
        </>
    );
}

export default App;
