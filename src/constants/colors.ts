// Terminal color codes and styles for Node.js applications
export const styles = {
    reset: '\x1b[0m',
    bold: '\x1b[1m',
    dim: '\x1b[2m',
    italic: '\x1b[3m',
    underline: '\x1b[4m',
    blink: '\x1b[5m',
    inverse: '\x1b[7m',
    hidden: '\x1b[8m',
    strikethrough: '\x1b[9m',
} as const;

// =========================
// Basic Text Colors
// =========================
export const basic = {
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
} as const;

// =========================
// 256 Color Palette
// =========================
export const palette = {
    pink: '\x1b[38;5;213m',
    blueSoft: '\x1b[38;5;117m',
    yellowSoft: '\x1b[38;5;227m',
    purple: '\x1b[38;5;141m',
    orange: '\x1b[38;5;208m',
    teal: '\x1b[38;5;80m',
    lime: '\x1b[38;5;118m',
} as const;

// =========================
// Utilities
// =========================
export const utils = {
    clear: '\x1b[2J\x1b[H',
} as const;

// Estilos
export const { reset, bold, dim, italic, underline, blink, inverse, hidden, strikethrough } = styles;

// Cores básicas
export const { black, red, green, yellow, blue, magenta, cyan, white } = basic;

// Cores da paleta
export const { pink, blueSoft, yellowSoft, purple, orange, teal, lime } = palette;

// Utils
export const { clear } = utils;

// =========================
// Combined Export
// =========================
export const colors = {
    ...styles,
    ...basic,
    ...palette,
    ...utils,
} as const;
