const createBaseNode = require("./BaseNode");
const Colors = require("../utils/ColorPalette");

function createText({

    text,

    x,

    y,

    parentId,

    fontSize = 16,

    width = 200,

    height = 24,

    color = Colors.BLACK,

    fontFamily = "Inter",

    fontWeight = "Regular",

    name = null

}) {

    const node = createBaseNode("TEXT", parentId);

    node.name = name || text;

    node.text = text;

    node.x = x;

    node.y = y;

    node.width = width;

    node.height = height;

    node.fontSize = fontSize;

    node.fontFamily = fontFamily;

    node.fontWeight = fontWeight;

    node.fillColor = color;

    return node;

}

module.exports = createText;