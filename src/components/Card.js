const createBaseNode = require("./BaseNode");

const Colors = require("../utils/ColorPalette");

function createCard({

    x,

    y,

    width = 280,

    height = 180,

    parentId,

    name = "Card"

}) {

    const node = createBaseNode("CARD", parentId);

    node.name = name;

    node.x = x;

    node.y = y;

    node.width = width;

    node.height = height;

    node.fillColor = Colors.WHITE;

    node.cornerRadius = 12;

    node.strokeWidth = 1;

    node.strokeColor = Colors.BLACK;

    node.componentId = "card";

    node.mainComponentId = "card_default";

    return node;

}

module.exports = createCard;