const Colors = require("../utils/ColorPalette");
const { randomChoice } = require("../utils/Random");

const THEMES = [

    {
        name: "Light Blue",

        background: { r: 245, g: 247, b: 252 },

        surface: { r: 255, g: 255, b: 255 },

        primary: { r: 0, g: 122, b: 255 },

        secondary: { r: 88, g: 86, b: 214 },

        text: { r: 33, g: 33, b: 33 },

        input: { r: 255, g: 255, b: 255 },

        border: { r: 220, g: 220, b: 220 },

        error: { r: 220, g: 38, b: 38 }

    },

    {

        name: "Green",

        background: { r: 244, g: 249, b: 244 },

        surface: { r: 255, g: 255, b: 255 },

        primary: { r: 52, g: 199, b: 89 },

        secondary: { r: 40, g: 160, b: 70 },

        text: { r: 30, g: 30, b: 30 },

        input: { r: 255, g: 255, b: 255 },

        border: { r: 215, g: 215, b: 215 },

        error: { r: 220, g: 38, b: 38 }

    },

    {

        name: "Purple",

        background: { r: 249, g: 246, b: 255 },

        surface: { r: 255, g: 255, b: 255 },

        primary: { r: 128, g: 90, b: 213 },

        secondary: { r: 98, g: 71, b: 170 },

        text: { r: 35, g: 35, b: 35 },

        input: { r: 255, g: 255, b: 255 },

        border: { r: 218, g: 218, b: 218 },

        error: { r: 220, g: 38, b: 38 }

    },

    {

        name: "Orange",

        background: { r: 255, g: 248, b: 240 },

        surface: { r: 255, g: 255, b: 255 },

        primary: { r: 255, g: 149, b: 0 },

        secondary: { r: 255, g: 111, b: 0 },

        text: { r: 40, g: 40, b: 40 },

        input: { r: 255, g: 255, b: 255 },

        border: { r: 220, g: 220, b: 220 },

        error: { r: 220, g: 38, b: 38 }

    },

    {

        name: "Dark",

        background: { r: 28, g: 28, b: 30 },

        surface: { r: 44, g: 44, b: 46 },

        primary: { r: 10, g: 132, b: 255 },

        secondary: { r: 94, g: 92, b: 230 },

        text: { r: 255, g: 255, b: 255 },

        input: { r: 58, g: 58, b: 60 },

        border: { r: 90, g: 90, b: 90 },

        error: { r: 255, g: 69, b: 58 }

    }

];

function applyTheme(node, theme) {

    switch (node.type) {

        case "FRAME":

            node.fillColor = theme.background;
            break;

        case "CARD":

        case "MODAL":

            node.fillColor = theme.surface;
            break;

        case "RECTANGLE":

        case "NAVBAR":

            node.fillColor = theme.primary;
            break;

        case "INPUT":

            node.fillColor = theme.input;
            node.borderColor = theme.border;
            break;

        case "TEXT":

            if (
                node.name &&
                node.name.toLowerCase().includes("error")
            ) {

                node.fillColor = theme.error;

            }

            else {

                node.fillColor = theme.text;

            }

            break;

        case "ICON":

            node.fillColor = theme.text;
            break;

        default:

            break;

    }

}

function randomizeTheme(design) {

    if (!design || !Array.isArray(design.nodes)) {

        return design;

    }

    const theme = randomChoice(THEMES);

    design.nodes.forEach(node => {

        applyTheme(node, theme);

    });

    design.theme = theme.name;

    return design;

}

module.exports = randomizeTheme;