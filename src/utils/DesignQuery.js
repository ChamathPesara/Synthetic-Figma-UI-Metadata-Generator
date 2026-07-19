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

function normalize(value) {

    return String(value || "")
        .toLowerCase()
        .trim();

}

function getAllNodes(design) {

    return Array.isArray(design.nodes)
        ? design.nodes
        : [];

}

function getNodeById(design, nodeId) {

    return getAllNodes(design).find(

        node => node.nodeId === nodeId

    );

}

function getChildren(design, parentId) {

    return getAllNodes(design).filter(

        node => node.parentId === parentId

    );

}

function getParent(design, node) {

    if (!node || !node.parentId) {

        return null;

    }

    return getNodeById(

        design,
        node.parentId

    );

}

function getNodesByType(design, type) {

    return getAllNodes(design).filter(

        node => node.type === type

    );

}

function getFrames(design) {

    return getNodesByType(design, "FRAME");

}

function getTexts(design) {

    return getNodesByType(design, "TEXT");

}

function getInputs(design) {

    return getNodesByType(design, "INPUT");

}

function getButtons(design) {

    return getNodesByType(design, "BUTTON");

}

function getImages(design) {

    return getNodesByType(design, "IMAGE");

}

function getIcons(design) {

    return getNodesByType(design, "ICON");

}

function getCards(design) {

    return getNodesByType(design, "CARD");

}

function getModals(design) {

    return getNodesByType(design, "MODAL");

}

function getNavbars(design) {

    return getNodesByType(design, "NAVBAR");

}

function getNodeLabel(node) {

    return normalize(

        `${node.name || ""} ${node.text || ""}`

    );

}

function getActionButtons(design) {

    return getButtons(design).filter(button => {

        const label = getNodeLabel(button);

        return ACTION_KEYWORDS.some(keyword =>

            label.includes(keyword)

        );

    });

}

function getErrorMessages(design) {

    return getTexts(design).filter(node => {

        const label = getNodeLabel(node);

        return ERROR_KEYWORDS.some(keyword =>

            label.includes(keyword)

        );

    });

}

function findNodesContaining(design, keyword) {

    keyword = normalize(keyword);

    return getAllNodes(design).filter(node =>

        getNodeLabel(node).includes(keyword)

    );

}

function findNodesContainingAny(design, keywords) {

    return getAllNodes(design).filter(node => {

        const label = getNodeLabel(node);

        return keywords.some(keyword =>

            label.includes(normalize(keyword))

        );

    });

}

function getFillColor(node) {

    return node.fillColor || null;

}

function getVisibleNodes(design) {

    return getAllNodes(design).filter(

        node => node.visible !== false

    );

}

module.exports = {

    normalize,

    getAllNodes,

    getNodeById,

    getParent,

    getChildren,

    getNodesByType,

    getFrames,

    getTexts,

    getInputs,

    getButtons,

    getImages,

    getIcons,

    getCards,

    getModals,

    getNavbars,

    getNodeLabel,

    getActionButtons,

    getErrorMessages,

    findNodesContaining,

    findNodesContainingAny,

    getFillColor,

    getVisibleNodes

};