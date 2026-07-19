const createBaseNode = require("./BaseNode");

const Colors = require("../utils/ColorPalette");

function createNavbar({

    x = 0,

    y = 0,

    width = 1440,

    height = 70,

    parentId,

    title = "Navigation"

}) {

    const node = createBaseNode("NAVBAR", parentId);

    node.name = title;

    node.text = title;

    node.x = x;

    node.y = y;

    node.width = width;

    node.height = height;

    node.fillColor = Colors.PRIMARY_BLUE;

    node.componentId = "navbar";

    node.mainComponentId = "navbar_default";

    node.itemSpacing = 20;

    return node;

}

module.exports = createNavbar;