const DesignBuilder = require("../../builders/DesignBuilder");

const createFrame = require("../../components/Frame");
const createModal = require("../../components/Modal");
const createText = require("../../components/Text");
const createButton = require("../../components/Button");
const createIcon = require("../../components/Icon");

const generateLayout = require("../../utils/LayoutGenerator");
const {generatePalette} = require("../../utils/ColorGenerator");

function generateDeleteConfirmationTemplate(designId) {

    //---------------------------------------
    // Builder
    //---------------------------------------

    const builder = new DesignBuilder(designId, "delete_confirmation");

    //---------------------------------------
    // Layout & Palette
    //---------------------------------------

    const layout = generateLayout();
    const palette = generatePalette();

    //---------------------------------------
    // Main Frame
    //---------------------------------------

    const frame = createFrame({

        width: layout.width,
        height: layout.height,
        color: palette.background

    });

    builder.addNode(frame);

    //---------------------------------------
    // Overlay
    //---------------------------------------

    const overlay = createFrame({

        width: layout.width,
        height: layout.height,
        color: {

            r: 230,
            g: 230,
            b: 230

        },

        parentId: frame.nodeId

    });

    overlay.name = "Overlay";

    builder.addNode(overlay);

    //---------------------------------------
    // Modal
    //---------------------------------------

    const modalWidth = 460;
    const modalHeight = 280;

    const modalX = Math.round((layout.width - modalWidth) / 2);
    const modalY = Math.round((layout.height - modalHeight) / 2);

    const modal = createModal({

        title: "Delete Confirmation",

        x: modalX,

        y: modalY,

        width: modalWidth,

        height: modalHeight,

        parentId: overlay.nodeId,

        hasCloseButton: true

    });

    modal.fillColor = palette.surface;

    builder.addNode(modal);

    //---------------------------------------
    // Close Icon
    //---------------------------------------

    builder.addNode(createIcon({

        name: "Close",

        x: modalX + modalWidth - 36,

        y: modalY + 20,

        size: 18,

        color: palette.text,

        parentId: modal.nodeId

    }));

    //---------------------------------------
    // Title
    //---------------------------------------

    builder.addNode(createText({

        text: "Delete Item?",

        x: modalX + 30,

        y: modalY + 35,

        width: 350,

        fontSize: 26,

        parentId: modal.nodeId,

        color: palette.text

    }));

    //---------------------------------------
    // Description
    //---------------------------------------

    builder.addNode(createText({

        text: "This action cannot be undone. Are you sure you want to permanently delete this item?",

        x: modalX + 30,

        y: modalY + 90,

        width: 390,

        height: 60,

        fontSize: 16,

        parentId: modal.nodeId,

        color: palette.text

    }));

    //---------------------------------------
    // Cancel Button
    //---------------------------------------

    builder.addNode(createButton({

        text: "Cancel",

        x: modalX + 30,

        y: modalY + 190,

        width: 180,

        height: 48,

        color: palette.secondary,

        parentId: modal.nodeId,

        mainComponentId: "secondary_button"

    }));

    //---------------------------------------
    // Delete Button
    //---------------------------------------

    builder.addNode(createButton({

        text: "Delete",

        x: modalX + 250,

        y: modalY + 190,

        width: 180,

        height: 48,

        color: palette.error,

        parentId: modal.nodeId,

        mainComponentId: "destructive_button"

    }));

    //---------------------------------------
    // Export
    //---------------------------------------

    return builder.export();

}

module.exports = generateDeleteConfirmationTemplate;