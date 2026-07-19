const Colors = require("../utils/ColorPalette");

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

const ERROR_KEYWORDS = [
    "error",
    "invalid",
    "wrong",
    "required",
    "failed",
    "warning",
    "try again"
];

function normalize(text) {

    return String(text || "")
        .toLowerCase()
        .trim();

}

function getLabel(node) {

    return normalize(`${node.name || ""} ${node.text || ""}`);

}

function isAction(node) {

    return ACTION_KEYWORDS.some(keyword =>
        getLabel(node).includes(keyword)
    );

}

function getAction(node) {

    return ACTION_KEYWORDS.find(keyword =>
        getLabel(node).includes(keyword)
    );

}

function isError(node) {

    return ERROR_KEYWORDS.some(keyword =>
        getLabel(node).includes(keyword)
    );

}

function distance(c1, c2) {

    if (!c1 || !c2) {

        return 0;

    }

    const dr = c1.r - c2.r;
    const dg = c1.g - c2.g;
    const db = c1.b - c2.b;

    return Math.sqrt(
        dr * dr +
        dg * dg +
        db * db
    );

}

function luminance(color) {

    const channels = [
        color.r,
        color.g,
        color.b
    ].map(value => {

        const c = value / 255;

        return c <= 0.03928
            ? c / 12.92
            : Math.pow((c + 0.055) / 1.055, 2.4);

    });

    return (
        0.2126 * channels[0] +
        0.7152 * channels[1] +
        0.0722 * channels[2]
    );

}

function contrast(foreground, background) {

    if (!foreground || !background) {

        return 0;

    }

    const l1 = luminance(foreground);
    const l2 = luminance(background);

    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);

    return (lighter + 0.05) / (darker + 0.05);

}

/*--------------------------------------------------*/

function hasColorInconsistency(nodes) {

    const groups = {};

    nodes
        .filter(isAction)
        .forEach(node => {

            const action = getAction(node);

            if (!groups[action]) {

                groups[action] = [];

            }

            groups[action].push(node);

        });

    return Object.values(groups).some(group => {

        if (group.length < 2) {

            return false;

        }

        for (let i = 0; i < group.length; i++) {

            for (let j = i + 1; j < group.length; j++) {

                if (
                    distance(
                        group[i].fillColor,
                        group[j].fillColor
                    ) > 90
                ) {

                    return true;

                }

            }

        }

        return false;

    });

}

/*--------------------------------------------------*/

function hasSameColorDifferentActions(nodes) {

    const actions = nodes.filter(isAction);

    for (let i = 0; i < actions.length; i++) {

        for (let j = i + 1; j < actions.length; j++) {

            if (
                getAction(actions[i]) !==
                getAction(actions[j])
            ) {

                if (
                    distance(
                        actions[i].fillColor,
                        actions[j].fillColor
                    ) < 18
                ) {

                    return true;

                }

            }

        }

    }

    return false;

}

/*--------------------------------------------------*/

function hasWeakErrorVisibility(nodes) {

    const background =
        nodes.find(node => node.type === "FRAME");

    if (!background) {

        return false;

    }

    return nodes
        .filter(isError)
        .some(node => {

            const ratio = contrast(
                node.fillColor,
                background.fillColor
            );

            return ratio < 4.5;

        });

}

/*--------------------------------------------------*/

function validateColorDesign(design) {

    const nodes = design.nodes || [];

    return {

        colorInconsistency:
            hasColorInconsistency(nodes),

        sameColorDifferentActions:
            hasSameColorDifferentActions(nodes),

        weakErrorVisibility:
            hasWeakErrorVisibility(nodes)

    };

}

module.exports = {

    validateColorDesign

};