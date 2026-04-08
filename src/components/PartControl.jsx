import React from 'react';

export default function PartControl({ part, value, onChange }) {
    const isDropDown = Boolean(part.values);

    let control;
    if (isDropDown) {
        control = (
            <select
                className="game-select"
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
            >
                {part.values.map((opt, i) => {
                    if (opt === null) return null;
                    return <option key={i} value={i}>{opt}</option>;
                })}
            </select>
        );
    } else {
        control = (
            <input
                className="game-checkbox"
                type="checkbox"
                checked={value === 1}
                onChange={(e) => onChange(e.target.checked ? 1 : 0)}
            />
        );
    }

    let NameLabel = <span>{part.name}</span>;
    if (part.url) {
        NameLabel = (
            <a href={`https://boomref.soulsphere.org/index.html${part.url}`} target="_blank" rel="noopener noreferrer" className="game-link">
                {part.name}
            </a>
        );
    }

    return (
        <div className="game-control-row">
            <div className="game-control-label">{NameLabel}</div>
            <div className="game-control-input">{control}</div>
        </div>
    );
}
