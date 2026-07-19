const { randomChoice, randomInt } = require("../utils/Random");

function clamp(value, min, max) {

    return Math.max(min, Math.min(max, value));

}

function randomOffset() {

    return randomInt(-20, 20);

}

function randomizeLayout(design) {

    if (!design || !Array.isArray(design.nodes)) {

        return design;

    }

    //---------------------------------------
    // Find Main Frame
    //---------------------------------------

    const frame = design.nodes.find(node => node.type === "FRAME");

    if (!frame) {

        return design;

    }

    //---------------------------------------
    // Global Margins
    //---------------------------------------

    const marginX = randomInt(30, 80);

    const marginY = randomInt(40, 90);

    //---------------------------------------
    // Vertical Cursor
    //---------------------------------------

    let currentY = marginY;

    //---------------------------------------
    // Randomize Components
    //---------------------------------------

    design.nodes.forEach(node => {

        if (node.nodeId === frame.nodeId) {

            return;

        }

        //---------------------------------------
        // Images
        //---------------------------------------

        if (node.type === "IMAGE") {

            node.x = Math.floor((frame.width - node.width) / 2);

            node.y = currentY;

            currentY += node.height + randomInt(20, 40);

        }

        //---------------------------------------
        // TEXT
        //---------------------------------------

        else if (node.type === "TEXT") {

            node.x = marginX + randomOffset();

            node.y = currentY;

            currentY += node.height + randomInt(10, 18);

        }

        //---------------------------------------
        // INPUT
        //---------------------------------------

        else if (node.type === "INPUT") {

            node.width = clamp(

                node.width + randomInt(-40, 40),

                220,

                frame.width - (marginX * 2)

            );

            node.x = marginX;

            node.y = currentY;

            currentY += node.height + randomInt(18, 30);

        }

        //---------------------------------------
        // BUTTON
        //---------------------------------------

        else if (

            node.type === "RECTANGLE"

        ) {

            node.width = clamp(

                node.width + randomInt(-30, 30),

                150,

                frame.width - (marginX * 2)

            );

            node.x = marginX;

            node.y = currentY;

            currentY += node.height + randomInt(18, 30);

        }

        //---------------------------------------
        // CARD
        //---------------------------------------

        else if (node.type === "CARD") {

            node.x += randomInt(-30, 30);

            node.y += randomInt(-20, 20);

        }

        //---------------------------------------
        // ICON
        //---------------------------------------

        else if (node.type === "ICON") {

            node.x += randomInt(-10, 10);

            node.y += randomInt(-10, 10);

        }

    });

    //---------------------------------------
    // Ensure inside frame
    //---------------------------------------

    design.nodes.forEach(node => {

        if (node.nodeId === frame.nodeId) {

            return;

        }

        node.x = clamp(

            node.x,

            0,

            frame.width - node.width

        );

        node.y = clamp(

            node.y,

            0,

            frame.height - node.height

        );

    });

    return design;

}

module.exports = randomizeLayout;