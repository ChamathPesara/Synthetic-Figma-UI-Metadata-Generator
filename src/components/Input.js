const createBaseNode = require("./BaseNode");
const Colors = require("../utils/ColorPalette");

function createInput({

    placeholder,

    x,

    y,

    width = 320,

    height = 48,

    parentId,

    cornerRadius = 8,

    borderColor = Colors.BLACK,

    componentId = "input",

    mainComponentId = "input_default"

}) {

    const node = createBaseNode("INPUT", parentId);

    node.name = `${placeholder} Input`;

    node.text = placeholder;

    node.x = x;
    node.y = y;

    node.width = width;
    node.height = height;

    node.fillColor = Colors.WHITE;

    node.strokeColor = borderColor;
    node.strokeWidth = 1;

    node.cornerRadius = cornerRadius;

    node.componentId = componentId;
    node.mainComponentId = mainComponentId;

    return node;

}

module.exports = createInput;