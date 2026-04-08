export function getLeftShift(mask) {
    let result = 0;
    while ((mask & 1) === 0) {
        mask = mask >> 1;
        result++;
    }
    return result;
}

export function encodeValue(calcData, partValues) {
    let result = calcData.base;
    calcData.parts.forEach((part, index) => {
        let val = Number(partValues[index]);
        if (isNaN(val)) val = 0;
        result |= (val << getLeftShift(part.mask));
    });
    return result;
}

export function decodeValue(calcData, value) {
    return calcData.parts.map((part) => {
        return (value & part.mask) >> getLeftShift(part.mask);
    });
}

export function isValidValue(calcData, value) {
    let mask = 0;
    calcData.parts.forEach(part => { mask |= part.mask; });
    return (value >= calcData.base && value <= calcData.base + mask);
}
