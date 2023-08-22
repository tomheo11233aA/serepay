export const handlePadding = (number: number) => {
    return {
        paddingLeft: number,
        paddingRight: number,
        paddingBottom: number,
        paddingTop: number,
    };
};

export const handleMargin = (number: number) => {
    return {
        marginLeft: number,
        marginRight: number,
        marginBottom: number,
        marginTop: number,
    };
};

export const handleSquare = (number: number) => {
    return {
        width: number,
        height: number,
    };
};

export const handleRound = (number: number) => {
    return {
        width: number,
        height: number,
        borderRadius: number / 2,
    };
};
