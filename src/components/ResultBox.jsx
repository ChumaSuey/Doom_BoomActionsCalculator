import React, { useState, useEffect } from 'react';

export default function ResultBox({ value, isValid, onValueInput }) {
    const [isHex, setIsHex] = useState(false);
    const [localInput, setLocalInput] = useState("");

    useEffect(() => {
        if (isHex) {
            setLocalInput("0x" + value.toString(16).toUpperCase());
        } else {
            setLocalInput(value.toString());
        }
    }, [value, isHex]);

    const handleInputChange = (e) => {
        const valStr = e.target.value;
        setLocalInput(valStr);
        let parsed = 0;
        if (valStr.toLowerCase().startsWith('0x')) {
            parsed = parseInt(valStr.substring(2), 16);
        } else {
            parsed = parseInt(valStr, 10);
        }

        if (!isNaN(parsed)) {
            onValueInput(parsed);
        }
    };

    return (
        <div className={`result-box ${isValid ? '' : 'invalid'}`}>
            <div className="hex-toggle">
                <input 
                    type="checkbox" 
                    id="hex-check" 
                    checked={isHex} 
                    onChange={(e) => setIsHex(e.target.checked)} 
                />
                <label htmlFor="hex-check">Hex</label>
            </div>
            <div className="result-input-container">
                <input
                    type={isHex ? "text" : "number"}
                    className="result-input"
                    value={localInput}
                    onChange={handleInputChange}
                />
                <button 
                    className="copy-button" 
                    onClick={() => navigator.clipboard.writeText(localInput)}
                    title="Copy value"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                </button>
            </div>
            {!isValid && <div className="invalid-warning">Invalid value for this type</div>}
        </div>
    );
}
