const DesignBuilder = require("../../builders/DesignBuilder");

const createFrame = require("../../components/Frame");
const createNavbar = require("../../components/NavBar");
const createText = require("../../components/Text");
const createInput = require("../../components/Input");
const createButton = require("../../components/Button");

const generateLayout = require("../../utils/LayoutGenerator");
const {generatePalette} = require("../../utils/ColorGenerator");

function generateContactFormTemplate(designId) {

    //----------------------------------------
    // Builder
    //----------------------------------------

    const builder = new DesignBuilder(designId, "contact_form");

    //----------------------------------------
    // Layout & Palette
    //----------------------------------------

    const layout = generateLayout();
    const palette = generatePalette();

    //----------------------------------------
    // Frame
    //----------------------------------------

    const frame = createFrame({

        width: layout.width,
        height: layout.height,
        color: palette.background

    });

    builder.addNode(frame);

    //----------------------------------------
    // Navigation Bar
    //----------------------------------------

    const navbar = createNavbar({

        width: layout.width,
        height: 70,
        parentId: frame.nodeId,
        title: "Navigation"

    });

    navbar.fillColor = palette.primary;

    builder.addNode(navbar);

    //----------------------------------------
    // Measurements
    //----------------------------------------

    const formWidth =
        layout.type === "mobile"
            ? layout.width - (layout.margin * 2)
            : 550;

    const startX = Math.round((layout.width - formWidth) / 2);

    let currentY = 120;

    //----------------------------------------
    // Title
    //----------------------------------------

    builder.addNode(createText({

        text: "Contact Us",

        x: startX,

        y: currentY,

        width: formWidth,

        fontSize: 34,

        parentId: frame.nodeId,

        color: palette.text

    }));

    currentY += 55;

    //----------------------------------------
    // Subtitle
    //----------------------------------------

    builder.addNode(createText({

        text: "We'd love to hear from you.",

        x: startX,

        y: currentY,

        width: formWidth,

        fontSize: 16,

        parentId: frame.nodeId,

        color: palette.text

    }));

    currentY += 55;

    //----------------------------------------
    // Full Name
    //----------------------------------------

    builder.addNode(createText({

        text: "Full Name",

        x: startX,

        y: currentY,

        fontSize: 16,

        parentId: frame.nodeId,

        color: palette.text

    }));

    currentY += 25;

    builder.addNode(createInput({

        placeholder: "Enter your full name",

        x: startX,

        y: currentY,

        width: formWidth,

        parentId: frame.nodeId

    }));

    currentY += 70;

    //----------------------------------------
    // Email
    //----------------------------------------

    builder.addNode(createText({

        text: "Email",

        x: startX,

        y: currentY,

        fontSize: 16,

        parentId: frame.nodeId,

        color: palette.text

    }));

    currentY += 25;

    builder.addNode(createInput({

        placeholder: "Enter your email",

        x: startX,

        y: currentY,

        width: formWidth,

        parentId: frame.nodeId

    }));

    currentY += 70;

    //----------------------------------------
    // Subject
    //----------------------------------------

    builder.addNode(createText({

        text: "Subject",

        x: startX,

        y: currentY,

        fontSize: 16,

        parentId: frame.nodeId,

        color: palette.text

    }));

    currentY += 25;

    builder.addNode(createInput({

        placeholder: "Enter subject",

        x: startX,

        y: currentY,

        width: formWidth,

        parentId: frame.nodeId

    }));

    currentY += 70;

    //----------------------------------------
    // Message Label
    //----------------------------------------

    builder.addNode(createText({

        text: "Message",

        x: startX,

        y: currentY,

        fontSize: 16,

        parentId: frame.nodeId,

        color: palette.text

    }));

    currentY += 25;

    //----------------------------------------
    // Message Box
    //----------------------------------------

    const messageBox = createInput({

        placeholder: "Write your message...",

        x: startX,

        y: currentY,

        width: formWidth,

        height: 140,

        parentId: frame.nodeId

    });

    builder.addNode(messageBox);

    currentY += 170;

    //----------------------------------------
    // Submit Button
    //----------------------------------------

    builder.addNode(createButton({

        text: "Submit",

        x: startX,

        y: currentY,

        width: 250,

        height: 50,

        color: palette.primary,

        parentId: frame.nodeId,

        mainComponentId: "primary_button"

    }));

    //----------------------------------------
    // Reset Button
    //----------------------------------------

    builder.addNode(createButton({

        text: "Reset",

        x: startX + formWidth - 250,

        y: currentY,

        width: 250,

        height: 50,

        color: palette.secondary,

        parentId: frame.nodeId,

        mainComponentId: "secondary_button"

    }));

    currentY += 80;

    //----------------------------------------
    // Footer
    //----------------------------------------

    builder.addNode(createText({

        text: "We'll respond within 24 hours.",

        x: startX,

        y: currentY,

        width: formWidth,

        fontSize: 14,

        parentId: frame.nodeId,

        color: palette.text

    }));

    //----------------------------------------
    // Export
    //----------------------------------------

    return builder.export();

}

module.exports = generateContactFormTemplate;