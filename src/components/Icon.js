const createBaseNode = require("./BaseNode");

const Colors = require("../utils/ColorPalette");

function createIcon({

    name = "Icon",

    x,

    y,

    size = 24,

    color = Colors.BLACK,

    parentId

}) {

    const node = createBaseNode("ICON", parentId);

    node.name = name;

    node.text = "";

    node.x = x;

    node.y = y;

    node.width = size;

    node.height = size;

    node.fillColor = color;
    
    node.iconName = name;

    node.componentId = "icon";

    node.mainComponentId = "icon_default";

    return node;

}

module.exports = createIcon;