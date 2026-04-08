import React, { useState } from 'react';
import Calculator from './components/Calculator';
import { boomCalculators } from './lib/boomData';

import './index.css';

function App() {
    const [activeTabId, setActiveTabId] = useState(boomCalculators[0].id);

    const activeCalc = boomCalculators.find(c => c.id === activeTabId) || boomCalculators[0];

    return (
        <div className="app-container">
            <header className="app-header">
                <div className="header-content">
                    <h1>Boom Actions Calculator</h1>
                    <p>Select generalized linedef and sector types below to generate their values.</p>
                </div>
            </header>
            
            <main className="app-main">
                <div className="tabs-sidebar">
                    {boomCalculators.map(calc => (
                        <button
                            key={calc.id}
                            className={`tab-button ${activeTabId === calc.id ? 'active' : ''}`}
                            onClick={() => setActiveTabId(calc.id)}
                        >
                            {calc.name}
                        </button>
                    ))}

                    <div className="sidebar-footer">
                        <a className="source-link" href="https://boomref.soulsphere.org" target="_blank" rel="noopener noreferrer">
                            <span className="icon">🔗</span> Source: Soulsphere
                        </a>
                        <a className="source-link" href="https://boomref.soulsphere.org/calc.html" target="_blank" rel="noopener noreferrer">
                            <span className="icon">🖩</span> Original Calculator
                        </a>
                    </div>
                </div>
                
                <div className="tab-content">
                    <Calculator calcData={activeCalc} />
                </div>
            </main>
        </div>
    );
}

export default App;
