const EXIT_KEYWORDS = [
    "back",
    "cancel",
    "close",
    "x",
    "dismiss",
    "return"
];

const DESTRUCTIVE_KEYWORDS = [
    "delete",
    "remove",
    "reset",
    "discard",
    "clear",
    "erase"
];

const UNDO_KEYWORDS = [
    "undo",
    "restore",
    "recover",
    "revert"
];

const CONFIRMATION_KEYWORDS = [
    "confirm",
    "yes",
    "no",
    "are you sure",
    "cancel"
];

const MODAL_KEYWORDS = [
    "modal",
    "dialog",
    "popup",
    "overlay",
    "confirmation"
];

function normalize(value) {

    return String(value || "")
        .toLowerCase()
        .trim();

}

function label(node) {

    return normalize(`${node.name || ""} ${node.text || ""}`);

}

function containsKeyword(node, keywords) {

    const text = label(node);

    return keywords.some(keyword => text.includes(keyword));

}

function getChildren(nodes, parentId) {

    return nodes.filter(node => node.parentId === parentId);

}

function getFrames(nodes) {

    return nodes.filter(node =>
        ["FRAME", "GROUP", "COMPONENT", "INSTANCE", "MODAL"]
            .includes(node.type)
    );

}

/*-----------------------------------------------------*/
/* Missing Exit Control */
/*-----------------------------------------------------*/

function hasMissingExit(nodes) {

    const frames = getFrames(nodes);

    return frames.some(frame => {

        const frameLabel = label(frame);

        const children = getChildren(nodes, frame.nodeId);

        const isDialog =
            containsKeyword(frame, MODAL_KEYWORDS) ||
            children.length >= 2;

        const requiresExit =
            isDialog ||
            frameLabel.includes("login") ||
            frameLabel.includes("register") ||
            frameLabel.includes("settings");

        if (!requiresExit) {

            return false;

        }

        const exits = children.filter(child =>
            containsKeyword(child, EXIT_KEYWORDS)
        );

        return exits.length === 0;

    });

}

/*-----------------------------------------------------*/
/* Missing Undo */
/*-----------------------------------------------------*/

function hasMissingUndo(nodes) {

    const destructive = nodes.filter(node =>
        containsKeyword(node, DESTRUCTIVE_KEYWORDS)
    );

    return destructive.some(node => {

        const siblings = getChildren(nodes, node.parentId);

        const localUndo = siblings.some(item =>
            containsKeyword(item, UNDO_KEYWORDS)
        );

        const globalUndo = nodes.some(item =>
            containsKeyword(item, UNDO_KEYWORDS)
        );

        return !localUndo && !globalUndo;

    });

}

/*-----------------------------------------------------*/
/* Missing Confirmation */
/*-----------------------------------------------------*/

function hasMissingConfirmation(nodes) {

    const destructive = nodes.filter(node =>
        containsKeyword(node, DESTRUCTIVE_KEYWORDS)
    );

    return destructive.some(node => {

        const frames = getFrames(nodes);

        const confirmationExists = frames.some(frame => {

            if (
                containsKeyword(frame, CONFIRMATION_KEYWORDS) ||
                containsKeyword(frame, MODAL_KEYWORDS)
            ) {

                return true;

            }

            const children = getChildren(nodes, frame.nodeId);

            const hasConfirm = children.some(child =>
                containsKeyword(child, [
                    "confirm",
                    "yes",
                    "delete",
                    "remove"
                ])
            );

            const hasCancel = children.some(child =>
                containsKeyword(child, [
                    "cancel",
                    "no",
                    "back"
                ])
            );

            return hasConfirm && hasCancel;

        });

        return !confirmationExists;

    });

}

/*-----------------------------------------------------*/
/* Main Validator */
/*-----------------------------------------------------*/

function validateErrorDesign(design) {

    const nodes = design.nodes || [];

    return {

        missingExitControl:
            hasMissingExit(nodes),

        destructiveWithoutUndo:
            hasMissingUndo(nodes),

        irreversibleWithoutConfirmation:
            hasMissingConfirmation(nodes)

    };

}

module.exports = {

    validateErrorDesign

};