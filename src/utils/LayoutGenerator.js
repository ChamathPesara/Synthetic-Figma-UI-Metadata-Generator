const { randomChoice, randomInt } = require("./Random");

const layouts = [

    //---------------------------------
    // Mobile
    //---------------------------------

    {
        name: "iPhone 13",
        type: "mobile",
        width: 390,
        height: 844
    },

    {
        name: "iPhone 14 Pro Max",
        type: "mobile",
        width: 430,
        height: 932
    },

    {
        name: "Pixel 7",
        type: "mobile",
        width: 412,
        height: 915
    },

    //---------------------------------
    // Tablet
    //---------------------------------

    {
        name: "iPad",
        type: "tablet",
        width: 768,
        height: 1024
    },

    {
        name: "iPad Pro",
        type: "tablet",
        width: 1024,
        height: 1366
    },

    //---------------------------------
    // Laptop
    //---------------------------------

    {
        name: "Laptop",
        type: "laptop",
        width: 1366,
        height: 768
    },

    //---------------------------------
    // Desktop
    //---------------------------------

    {
        name: "Desktop HD",
        type: "desktop",
        width: 1440,
        height: 900
    },

    {
        name: "Desktop Full HD",
        type: "desktop",
        width: 1920,
        height: 1080
    }

];

function generateLayout() {

    const layout = { ...randomChoice(layouts) };

    layout.margin = randomInt(24, 48);

    layout.grid = randomChoice([8, 10, 12]);

    layout.cornerRadius = randomChoice([8, 10, 12, 16]);

    layout.spacing = randomChoice([16, 20, 24, 28, 32]);

    return layout;

}

module.exports = generateLayout;