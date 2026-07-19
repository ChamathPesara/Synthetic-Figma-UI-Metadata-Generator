const Colors = require("../../utils/ColorPalette");

function cloneColor(color) {

    return {
        r: color.r,
        g: color.g,
        b: color.b
    };

}

function normalize(text) {

    return String(text || "")
        .toLowerCase()
        .trim();

}

function isErrorNode(node) {

    const label = normalize(`${node.name} ${node.text}`);

    return [

        "error",
        "invalid",
        "required",
        "wrong",
        "failed",
        "warning",
        "try again"

    ].some(keyword => label.includes(keyword));

}

function randomChoice(array) {

    return array[Math.floor(Math.random() * array.length)];

}

function injectWeakErrorVisibility(design) {

    if (!design || !Array.isArray(design.nodes)) {

        return null;

    }

    //---------------------------------------------------
    // Find error messages
    //---------------------------------------------------

    const errorNodes = design.nodes.filter(node =>

        node.type === "TEXT" &&
        node.fillColor &&
        isErrorNode(node)

    );

    if (errorNodes.length === 0) {

        return null;

    }

    //---------------------------------------------------
    // Pick one error message
    //---------------------------------------------------

    const node = randomChoice(errorNodes);

    const originalColor = cloneColor(node.fillColor);

    //---------------------------------------------------
    // Three mutation strategies
    //---------------------------------------------------

    const strategy = randomChoice([

        "lowContrast",

        "normalText",

        "weakRed"

    ]);

    //---------------------------------------------------
    // Strategy 1
    // Low contrast
    //---------------------------------------------------

    if (strategy === "lowContrast") {

        node.fillColor = {

            r: 190,
            g: 190,
            b: 190

        };

    }

    //---------------------------------------------------
    // Strategy 2
    // Same color as normal body text
    //---------------------------------------------------

    else if (strategy === "normalText") {

        node.fillColor = cloneColor(Colors.BLACK);

    }

    //---------------------------------------------------
    // Strategy 3
    // Weak red
    //---------------------------------------------------

    else {

        node.fillColor = {

            r: 170,
            g: 90,
            b: 90

        };

    }

    //---------------------------------------------------
    // Annotation
    //---------------------------------------------------

    return {

        issue: "weak_error_visibility",

        modifiedNode: node.nodeId,

        strategy,

        originalColor,

        newColor: cloneColor(node.fillColor)

    };

}

module.exports = injectWeakErrorVisibility;