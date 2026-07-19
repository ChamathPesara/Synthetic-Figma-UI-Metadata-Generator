const createBaseNode = require("./BaseNode");
const Colors = require("../utils/ColorPalette");

function createErrorMessage({

    text = "Invalid email",

    x,

    y,

    parentId,

    color = Colors.ERROR_RED,

    fontSize = 14

}) {

    const node = createBaseNode("TEXT", parentId);

    node.name = "Error Message";

    node.text = text;

    node.x = x;
    node.y = y;

    node.width = 260;

    node.height = 20;

    node.fontSize = fontSize;

    node.fillColor = color;

    node.mainComponentId = "error_message";

    return node;

}

module.exports = createErrorMessage;