// =========================
// Estilos
// =========================
const styles = {
    reset: "\x1b[0m",
    bold: "\x1b[1m",
    dim: "\x1b[2m",
    italic: "\x1b[3m",
    underline: "\x1b[4m",
    blink: "\x1b[5m",
    inverse: "\x1b[7m",
    hidden: "\x1b[8m",
    strikethrough: "\x1b[9m",
};

// =========================
// Cores básicas de texto
// =========================
const basic = {
    black: "\x1b[30m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
};

// =========================
// Paleta 256 cores
// =========================
const palette = {
    pink: "\x1b[38;5;213m",
    blueSoft: "\x1b[38;5;117m",
    yellowSoft: "\x1b[38;5;227m",
    purple: "\x1b[38;5;141m",
    orange: "\x1b[38;5;208m",
    teal: "\x1b[38;5;80m",
    lime: "\x1b[38;5;118m",
};


const utils = {
    clear: "\x1b[2J\x1b[H",
};

export const { reset, bold, dim, italic, underline, blink, inverse, hidden, strikethrough } = styles;
export const { black, red, green, yellow, blue, magenta, cyan, white } = basic;
export const { pink, blueSoft, yellowSoft, purple, orange, teal, lime } = palette;
export const { clear } = utils;
