const DesignBuilder = require("../../builders/DesignBuilder");

const createFrame = require("../../components/Frame");
const createModal = require("../../components/Modal");
const createText = require("../../components/Text");
const createButton = require("../../components/Button");
const createIcon = require("../../components/Icon");

const generateLayout = require("../../utils/LayoutGenerator");
const { generatePalette } = require("../../utils/ColorGenerator");

function generateResetConfirmationTemplate(designId) {

    //----------------------------------------
    // Builder
    //----------------------------------------

    const builder = new DesignBuilder(designId, "reset_confirmation");

    //----------------------------------------
    // Layout & Theme
    //----------------------------------------

    const layout = generateLayout();
    const palette = generatePalette();

    //----------------------------------------
    // Main Frame
    //----------------------------------------

    const frame = createFrame({

        width: layout.width,
        height: layout.height,
        color: palette.background

    });

    builder.addNode(frame);

    //----------------------------------------
    // Overlay
    //----------------------------------------

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

    //----------------------------------------
    // Modal
    //----------------------------------------

    const modalWidth = 460;
    const modalHeight = 270;

    const modalX = Math.round((layout.width - modalWidth) / 2);
    const modalY = Math.round((layout.height - modalHeight) / 2);

    const modal = createModal({

        title: "Reset Confirmation",

        x: modalX,
        y: modalY,
        width: modalWidth,
        height: modalHeight,
        parentId: overlay.nodeId,
        hasCloseButton: true

    });

    modal.fillColor = palette.surface;

    builder.addNode(modal);

    //----------------------------------------
    // Close Icon
    //----------------------------------------

    builder.addNode(createIcon({

        name: "Close",

        x: modalX + modalWidth - 36,

        y: modalY + 20,

        size: 18,

        color: palette.text,

        parentId: modal.nodeId

    }));

    //----------------------------------------
    // Title
    //----------------------------------------

    builder.addNode(createText({

        text: "Reset Password?",

        x: modalX + 30,

        y: modalY + 35,

        width: 320,

        fontSize: 26,

        parentId: modal.nodeId,

        color: palette.text

    }));

    //----------------------------------------
    // Description
    //----------------------------------------

    builder.addNode(createText({

        text: "Your current password will be removed and you'll need to create a new one.",

        x: modalX + 30,

        y: modalY + 85,

        width: 390,

        height: 60,

        fontSize: 16,

        parentId: modal.nodeId,

        color: palette.text

    }));

    //----------------------------------------
    // Cancel Button
    //----------------------------------------

    builder.addNode(createButton({

        text: "Cancel",

        x: modalX + 30,

        y: modalY + 185,

        width: 180,

        height: 48,

        color: palette.secondary,

        parentId: modal.nodeId,

        mainComponentId: "secondary_button"

    }));

    //----------------------------------------
    // Reset Button
    //----------------------------------------

    builder.addNode(createButton({

        text: "Reset",

        x: modalX + 250,

        y: modalY + 185,

        width: 180,

        height: 48,

        color: palette.warning,

        parentId: modal.nodeId,

        mainComponentId: "warning_button"

    }));

    //----------------------------------------
    // Export
    //----------------------------------------

    return builder.export();

}

module.exports = generateResetConfirmationTemplate;