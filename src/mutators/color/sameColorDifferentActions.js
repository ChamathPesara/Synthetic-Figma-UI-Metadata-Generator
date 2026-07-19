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

function normalize(text) {

    return String(text || "")
        .toLowerCase()
        .trim();

}

function getAction(node) {

    const label = normalize(`${node.name} ${node.text}`);

    return ACTION_KEYWORDS.find(action =>
        label.includes(action)
    ) || null;

}

function cloneColor(color) {

    return {

        r: color.r,
        g: color.g,
        b: color.b

    };

}

function sameColor(a, b) {

    if (!a || !b) return false;

    return (
        a.r === b.r &&
        a.g === b.g &&
        a.b === b.b
    );

}

function injectSameColorDifferentActions(design) {

    if (!design || !Array.isArray(design.nodes)) {

        return null;

    }

    //----------------------------------------------------
    // Find all action buttons
    //----------------------------------------------------

    const actionNodes = design.nodes.filter(node => {

        return getAction(node) && node.fillColor;

    });

    //----------------------------------------------------
    // Need at least two actions
    //----------------------------------------------------

    if (actionNodes.length < 2) {

        return null;

    }

    //----------------------------------------------------
    // Group by action
    //----------------------------------------------------

    const groups = {};

    actionNodes.forEach(node => {

        const action = getAction(node);

        if (!groups[action]) {

            groups[action] = [];

        }

        groups[action].push(node);

    });

    //----------------------------------------------------
    // Need at least two different actions
    //----------------------------------------------------

    const actions = Object.keys(groups);

    if (actions.length < 2) {

        return null;

    }

    //----------------------------------------------------
    // Pick two different actions
    //----------------------------------------------------

    const firstAction =
        actions[Math.floor(Math.random() * actions.length)];

    let secondAction;

    do {

        secondAction =
            actions[Math.floor(Math.random() * actions.length)];

    } while (secondAction === firstAction);

    //----------------------------------------------------
    // Pick one node from each action
    //----------------------------------------------------

    const sourceNode =
        groups[firstAction][
            Math.floor(Math.random() * groups[firstAction].length)
        ];

    const targetNode =
        groups[secondAction][
            Math.floor(Math.random() * groups[secondAction].length)
        ];

    //----------------------------------------------------
    // Already same color?
    //----------------------------------------------------

    if (sameColor(sourceNode.fillColor, targetNode.fillColor)) {

        return null;

    }

    //----------------------------------------------------
    // Copy source color
    //----------------------------------------------------

    const originalColor = cloneColor(targetNode.fillColor);

    targetNode.fillColor = cloneColor(sourceNode.fillColor);

    //----------------------------------------------------
    // Annotation
    //----------------------------------------------------

    return {

        issue: "same_color_different_actions",

        modifiedNode: targetNode.nodeId,

        sourceAction: firstAction,

        targetAction: secondAction,

        sharedColor: cloneColor(sourceNode.fillColor),

        originalColor

    };

}

module.exports = injectSameColorDifferentActions;