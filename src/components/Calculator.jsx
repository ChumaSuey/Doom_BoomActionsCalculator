import React, { useState, useEffect } from 'react';
import PartControl from './PartControl';
import ResultBox from './ResultBox';
import { encodeValue, decodeValue, isValidValue } from '../lib/boomCalc';

export default function Calculator({ calcData }) {
    const [partValues, setPartValues] = useState(() => decodeValue(calcData, calcData.base));
    const [encodedVal, setEncodedVal] = useState(calcData.base);
    const [isValid, setIsValid] = useState(true);

    useEffect(() => {
        const baseVal = calcData.base;
        setPartValues(decodeValue(calcData, baseVal));
        setEncodedVal(baseVal);
        setIsValid(true);
    }, [calcData]);

    const handlePartChange = (index, value) => {
        const newPartValues = [...partValues];
        newPartValues[index] = value;
        setPartValues(newPartValues);
        
        const newVal = encodeValue(calcData, newPartValues);
        setEncodedVal(newVal);
        setIsValid(isValidValue(calcData, newVal));
    };

    const handleResultInput = (newVal) => {
        const valid = isValidValue(calcData, newVal);
        setIsValid(valid);
        if (valid) {
            setPartValues(decodeValue(calcData, newVal));
        }
        setEncodedVal(newVal);
    };

    return (
        <div className="calculator-panel">
            <h2 className="calculator-title">{calcData.name}</h2>
            <ResultBox value={encodedVal} isValid={isValid} onValueInput={handleResultInput} />
            <div className="parts-container">
                {calcData.parts.map((part, index) => (
                    <PartControl
                        key={`${calcData.id}-${index}`}
                        part={part}
                        value={partValues[index]}
                        onChange={(val) => handlePartChange(index, val)}
                    />
                ))}
            </div>
        </div>
    );
}
