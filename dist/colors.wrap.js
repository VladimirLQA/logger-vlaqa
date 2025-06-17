const wrapInGreen = (txt) => {
    return `\u001B[32m${txt}\u001B[0m`;
};
const wrapInRed = (txt) => {
    return `\u001B[31m${txt}\u001B[0m`;
};
const wrapInYellow = (txt) => {
    return `\u001B[33m${txt}\u001B[0m`;
};
const wrapInMagenta = (txt) => {
    return `\u001B[35m${txt}\u001B[0m`;
};
export const colors = {
    error: (text) => wrapInRed(text),
    debug: (text) => wrapInMagenta(text),
    info: (text) => wrapInGreen(text),
    warn: (text) => wrapInYellow(text),
};
