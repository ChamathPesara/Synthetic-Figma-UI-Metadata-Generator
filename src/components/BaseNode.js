const { generateId } = require("../utils/IdGenerator");

function createBaseNode(type, parentId = null) {

    return {

        nodeId: generateId(type.toLowerCase()),

        parentId,

        //---------------------------------
        // Basic Information
        //---------------------------------

        type,

        name: "",

        text: "",

        visible: true,

        //---------------------------------
        // Position
        //---------------------------------

        x: 0,

        y: 0,

        width: 0,

        height: 0,

        rotation: 0,

        //---------------------------------
        // Appearance
        //---------------------------------

        fillColor: null,

        strokeColor: null,

        strokeWidth: 0,

        opacity: 1,

        cornerRadius: 0,

        //---------------------------------
        // Layout Metadata
        //---------------------------------

        itemSpacing: null,

        paddingLeft: null,

        paddingRight: null,

        paddingTop: null,

        paddingBottom: null,

        //---------------------------------
        // Component Metadata
        //---------------------------------

        componentId: null,

        mainComponentId: null

    };

}

module.exports = createBaseNode;