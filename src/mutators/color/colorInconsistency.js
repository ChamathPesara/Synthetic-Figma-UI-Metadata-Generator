const Colors = require("../../utils/ColorPalette");

const ACTION_KEYWORDS = [
    "login",
    "register",
    "submit",
    "save",
    "continue",
    "next",
    "confirm",
    "delete",
    "remove",
    "reset",
    "cancel"
];

const AVAILABLE_COLORS = [
    Colors.PRIMARY_BLUE,
    Colors.SUCCESS_GREEN,
    Colors.ERROR_RED,
    Colors.WARNING_ORANGE
];

function normalize(text) {
    return String(text || "").toLowerCase().trim();
}

function getAction(node) {

    const label = normalize(`${node.name} ${node.text}`);

    return ACTION_KEYWORDS.find(action => label.includes(action)) || null;

}

function sameColor(a, b) {

    if (!a || !b) return false;

    return (
        a.r === b.r &&
        a.g === b.g &&
        a.b === b.b
    );

}

function cloneColor(color) {

    return {
        r: color.r,
        g: color.g,
        b: color.b
    };

}

function randomDifferentColor(currentColor) {

    const candidates = AVAILABLE_COLORS.filter(
        color => !sameColor(color, currentColor)
    );

    return cloneColor(
        candidates[
            Math.floor(Math.random() * candidates.length)
        ]
    );

}

function injectColorInconsistency(design) {

    if (!design || !Array.isArray(design.nodes)) {

        return null;

    }

    //-------------------------------------------------------
    // Find all action buttons
    //-------------------------------------------------------

    const actionGroups = {};

    design.nodes.forEach(node => {

        const action = getAction(node);

        if (!action) return;

        if (!node.fillColor) return;

        if (!actionGroups[action]) {

            actionGroups[action] = [];

        }

        actionGroups[action].push(node);

    });

    //-------------------------------------------------------
    // Find actions appearing at least twice
    //-------------------------------------------------------

    const validActions = Object.keys(actionGroups).filter(
        key => actionGroups[key].length >= 2
    );

    //-------------------------------------------------------
    // Cannot create inconsistency
    //-------------------------------------------------------

    if (validActions.length === 0) {

        return null;

    }

    //-------------------------------------------------------
    // Pick random action
    //-------------------------------------------------------

    const selectedAction =
        validActions[
            Math.floor(Math.random() * validActions.length)
        ];

    const nodes = actionGroups[selectedAction];

    //-------------------------------------------------------
    // Pick ONE node only
    //-------------------------------------------------------

    const selectedNode =
        nodes[
            Math.floor(Math.random() * nodes.length)
        ];

    const originalColor = cloneColor(selectedNode.fillColor);

    //-------------------------------------------------------
    // Apply different color
    //-------------------------------------------------------

    selectedNode.fillColor = randomDifferentColor(originalColor);

    //-------------------------------------------------------
    // Annotation
    //-------------------------------------------------------

    return {

        issue: "color_inconsistency",

        modifiedNode: selectedNode.nodeId,

        action: selectedAction,

        originalColor,

        newColor: cloneColor(selectedNode.fillColor)

    };

}

module.exports = injectColorInconsistency;