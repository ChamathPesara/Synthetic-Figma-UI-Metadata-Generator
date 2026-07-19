const Colors = require("./ColorPalette");

const {
    randomChoice,
    randomBoolean,
    randomInt
} = require("./Random");

const themes = [

    {
        name: "blue_light",

        primary: Colors.PRIMARY_BLUE,
        secondary: { r: 90, g: 170, b: 255 },

        background: Colors.WHITE,
        surface: { r: 245, g: 247, b: 250 },

        text: Colors.BLACK,
        secondaryText: { r: 90, g: 90, b: 90 },

        buttonText: Colors.WHITE,

        border: { r: 220, g: 220, b: 220 },

        success: Colors.SUCCESS_GREEN,
        warning: Colors.WARNING_ORANGE,
        error: Colors.ERROR_RED
    },

    {
        name: "green_light",

        primary: Colors.SUCCESS_GREEN,
        secondary: { r: 95, g: 210, b: 120 },

        background: Colors.WHITE,
        surface: { r: 247, g: 250, b: 247 },

        text: Colors.BLACK,
        secondaryText: { r: 90, g: 90, b: 90 },

        buttonText: Colors.WHITE,

        border: { r: 220, g: 220, b: 220 },

        success: Colors.SUCCESS_GREEN,
        warning: Colors.WARNING_ORANGE,
        error: Colors.ERROR_RED
    },

    {
        name: "orange_light",

        primary: Colors.WARNING_ORANGE,
        secondary: { r: 255, g: 185, b: 80 },

        background: Colors.WHITE,
        surface: { r: 252, g: 249, b: 243 },

        text: Colors.BLACK,
        secondaryText: { r: 85, g: 85, b: 85 },

        buttonText: Colors.WHITE,

        border: { r: 222, g: 222, b: 222 },

        success: Colors.SUCCESS_GREEN,
        warning: Colors.WARNING_ORANGE,
        error: Colors.ERROR_RED
    },

    {
        name: "purple_light",

        primary: { r: 108, g: 92, b: 231 },
        secondary: { r: 145, g: 130, b: 255 },

        background: Colors.WHITE,
        surface: { r: 248, g: 246, b: 255 },

        text: Colors.BLACK,
        secondaryText: { r: 90, g: 90, b: 90 },

        buttonText: Colors.WHITE,

        border: { r: 224, g: 224, b: 224 },

        success: Colors.SUCCESS_GREEN,
        warning: Colors.WARNING_ORANGE,
        error: Colors.ERROR_RED
    },

    {
        name: "dark",

        primary: Colors.PRIMARY_BLUE,
        secondary: { r: 110, g: 180, b: 255 },

        background: { r: 20, g: 20, b: 20 },
        surface: { r: 40, g: 40, b: 40 },

        text: { r: 245, g: 245, b: 245 },
        secondaryText: { r: 185, g: 185, b: 185 },

        buttonText: Colors.WHITE,

        border: { r: 70, g: 70, b: 70 },

        success: Colors.SUCCESS_GREEN,
        warning: Colors.WARNING_ORANGE,
        error: Colors.ERROR_RED
    }

];

function cloneColor(color) {

    return {

        r: color.r,
        g: color.g,
        b: color.b

    };

}

function cloneTheme(theme) {

    return {

        name: theme.name,

        primary: cloneColor(theme.primary),
        secondary: cloneColor(theme.secondary),

        background: cloneColor(theme.background),
        surface: cloneColor(theme.surface),

        text: cloneColor(theme.text),
        secondaryText: cloneColor(theme.secondaryText),

        buttonText: cloneColor(theme.buttonText),

        border: cloneColor(theme.border),

        success: cloneColor(theme.success),
        warning: cloneColor(theme.warning),
        error: cloneColor(theme.error)

    };

}

function slightlyVary(color) {

    const variation = () => randomInt(-5, 5);

    return {

        r: Math.max(0, Math.min(255, color.r + variation())),
        g: Math.max(0, Math.min(255, color.g + variation())),
        b: Math.max(0, Math.min(255, color.b + variation()))

    };

}

function generatePalette() {

    const palette = cloneTheme(randomChoice(themes));

    // Slightly vary colors so thousands of designs
    // don't have identical RGB values.

    if (randomBoolean(0.6)) {

        palette.primary = slightlyVary(palette.primary);

    }

    if (randomBoolean(0.5)) {

        palette.surface = slightlyVary(palette.surface);

    }

    if (randomBoolean(0.5)) {

        palette.background = slightlyVary(palette.background);

    }

    return palette;

}

module.exports = {

    generatePalette,

    themes

};