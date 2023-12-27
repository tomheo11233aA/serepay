
export const roundDecimalValues = function (value: number, coinValue: number) {
    let decimalPlaces;
    if (coinValue > 10000) {
        decimalPlaces = 8;
    } else if (coinValue >= 100 && coinValue <= 9999) {
        decimalPlaces = 6;
    } else {
        decimalPlaces = 2;
    }
    const roundedValue = value.toFixed(decimalPlaces);
    return roundedValue;
};
