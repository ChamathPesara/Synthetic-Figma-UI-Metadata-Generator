const DesignBuilder = require("../../builders/DesignBuilder");

const createFrame = require("../../components/Frame");
const createNavbar = require("../../components/NavBar");
const createCard = require("../../components/Card");
const createText = require("../../components/Text");
const createButton = require("../../components/Button");
const createInput = require("../../components/Input");

const generateLayout = require("../../utils/LayoutGenerator");
const {generatePalette} = require("../../utils/ColorGenerator");

function generateSettingsTemplate(designId) {

    //---------------------------------------
    // Builder
    //---------------------------------------

    const builder = new DesignBuilder(designId, "settings");

    //---------------------------------------
    // Layout & Theme
    //---------------------------------------

    const layout = generateLayout();
    const palette = generatePalette();

    //---------------------------------------
    // Frame
    //---------------------------------------

    const frame = createFrame({

        width: layout.width,
        height: layout.height,
        color: palette.background

    });

    builder.addNode(frame);

    //---------------------------------------
    // Navbar
    //---------------------------------------

    const navbar = createNavbar({

        width: layout.width,
        height: 70,
        parentId: frame.nodeId,
        title: "Settings"

    });

    navbar.fillColor = palette.primary;

    builder.addNode(navbar);

    //---------------------------------------
    // Settings Card
    //---------------------------------------

    const cardWidth = 700;
    const cardHeight = 700;

    const cardX = Math.round((layout.width - cardWidth) / 2);
    const cardY = 120;

    const card = createCard({

        x: cardX,
        y: cardY,
        width: cardWidth,
        height: cardHeight,
        parentId: frame.nodeId,
        name: "Settings Card"

    });

    card.fillColor = palette.surface;

    builder.addNode(card);

    //---------------------------------------
    // Heading
    //---------------------------------------

    builder.addNode(createText({

        text: "Account Settings",

        x: cardX + 30,

        y: cardY + 30,

        width: 400,

        fontSize: 30,

        parentId: card.nodeId,

        color: palette.text

    }));

    //---------------------------------------
    // Name
    //---------------------------------------

    let currentY = cardY + 100;

    builder.addNode(createText({

        text: "Full Name",

        x: cardX + 30,

        y: currentY,

        parentId: card.nodeId,

        fontSize: 16,

        color: palette.text

    }));

    currentY += 25;

    builder.addNode(createInput({

        placeholder: "John Doe",

        x: cardX + 30,

        y: currentY,

        width: 640,

        parentId: card.nodeId

    }));

    //---------------------------------------
    // Email
    //---------------------------------------

    currentY += 75;

    builder.addNode(createText({

        text: "Email",

        x: cardX + 30,

        y: currentY,

        parentId: card.nodeId,

        fontSize: 16,

        color: palette.text

    }));

    currentY += 25;

    builder.addNode(createInput({

        placeholder: "john@email.com",

        x: cardX + 30,

        y: currentY,

        width: 640,

        parentId: card.nodeId

    }));

    //---------------------------------------
    // Language
    //---------------------------------------

    currentY += 75;

    builder.addNode(createText({

        text: "Language",

        x: cardX + 30,

        y: currentY,

        parentId: card.nodeId,

        fontSize: 16,

        color: palette.text

    }));

    currentY += 25;

    builder.addNode(createInput({

        placeholder: "English",

        x: cardX + 30,

        y: currentY,

        width: 640,

        parentId: card.nodeId

    }));

    //---------------------------------------
    // Theme
    //---------------------------------------

    currentY += 75;

    builder.addNode(createText({

        text: "Theme",

        x: cardX + 30,

        y: currentY,

        parentId: card.nodeId,

        fontSize: 16,

        color: palette.text

    }));

    currentY += 25;

    builder.addNode(createInput({

        placeholder: "Light",

        x: cardX + 30,

        y: currentY,

        width: 640,

        parentId: card.nodeId

    }));

    //---------------------------------------
    // Notification Settings
    //---------------------------------------

    currentY += 90;

    builder.addNode(createText({

        text: "Notifications",

        x: cardX + 30,

        y: currentY,

        parentId: card.nodeId,

        fontSize: 22,

        color: palette.text

    }));

    currentY += 45;

    builder.addNode(createText({

        text: "✓ Email Notifications",

        x: cardX + 40,

        y: currentY,

        parentId: card.nodeId,

        fontSize: 16,

        color: palette.text

    }));

    currentY += 35;

    builder.addNode(createText({

        text: "✓ SMS Notifications",

        x: cardX + 40,

        y: currentY,

        parentId: card.nodeId,

        fontSize: 16,

        color: palette.text

    }));

    //---------------------------------------
    // Action Buttons
    //---------------------------------------

    currentY += 70;

    builder.addNode(createButton({

        text: "Save",

        x: cardX + 30,

        y: currentY,

        width: 300,

        height: 50,

        color: palette.primary,

        parentId: card.nodeId,

        mainComponentId: "primary_button"

    }));

    builder.addNode(createButton({

        text: "Cancel",

        x: cardX + 370,

        y: currentY,

        width: 300,

        height: 50,

        color: palette.secondary,

        parentId: card.nodeId,

        mainComponentId: "secondary_button"

    }));

    //---------------------------------------
    // Footer
    //---------------------------------------

    builder.addNode(createText({

        text: "Version 1.0.0",

        x: cardX + 30,

        y: cardY + cardHeight - 40,

        parentId: card.nodeId,

        fontSize: 13,

        color: palette.text

    }));

    //---------------------------------------
    // Export
    //---------------------------------------

    return builder.export();

}

module.exports = generateSettingsTemplate;