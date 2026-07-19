const createBaseNode = require("./BaseNode");
const Colors = require("../utils/ColorPalette");

function createFrame({

    width,

    height,

    color = Colors.WHITE,

    parentId = null,

    name = "Main Frame"

}) {

    const frame = createBaseNode("FRAME", parentId);

    frame.name = name;

    frame.width = width;

    frame.height = height;

    frame.fillColor = color;

    frame.itemSpacing = 24;

    return frame;

}

module.exports = createFrame;