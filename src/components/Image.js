const createBaseNode = require("./BaseNode");

function createImage({

    name = "Image",

    x,

    y,

    width = 150,

    height = 150,

    parentId

}) {

    const node = createBaseNode("IMAGE", parentId);

    node.name = name;

    node.x = x;

    node.y = y;

    node.width = width;

    node.height = height;

    node.imageSource = null;

    node.imageType = "placeholder";

    return node;

}

module.exports = createImage;