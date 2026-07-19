const createBaseNode = require("./BaseNode");
const Colors = require("../utils/ColorPalette");

function createButton({

    text,

    x,

    y,

    width = 180,

    height = 48,

    color = Colors.PRIMARY_BLUE,

    parentId,

    cornerRadius = 10,

    componentId = "button",

    mainComponentId = "button_primary"

}) {

    const button = createBaseNode("RECTANGLE", parentId);

    button.name = `${text} Button`;

    button.text = text;

    button.x = x;

    button.y = y;

    button.width = width;

    button.height = height;

    button.cornerRadius = cornerRadius;

    button.fillColor = color;

    button.componentId = componentId;

    button.mainComponentId = mainComponentId;

    return button;

}

module.exports = createButton;