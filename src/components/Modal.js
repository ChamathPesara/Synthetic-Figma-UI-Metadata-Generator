const createBaseNode = require("./BaseNode");

const Colors = require("../utils/ColorPalette");

function createModal({

    title = "Dialog",

    x,

    y,

    width = 450,

    height = 280,

    parentId,

    hasCloseButton = true

}) {

    const node = createBaseNode("MODAL", parentId);

    node.name = title;

    node.text = title;

    node.x = x;

    node.y = y;

    node.width = width;

    node.height = height;

    node.fillColor = Colors.WHITE;

    node.modalType = "confirmation";

    node.hasCloseButton = hasCloseButton;

    node.overlay = true;

    node.cornerRadius = 12;

    node.itemSpacing = 24;
    return node;

}

module.exports = createModal;