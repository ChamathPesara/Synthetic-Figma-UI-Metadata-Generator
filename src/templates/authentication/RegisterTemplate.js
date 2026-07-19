const DesignBuilder = require("../../builders/DesignBuilder");

const createFrame = require("../../components/Frame");
const createImage = require("../../components/Image");
const createText = require("../../components/Text");
const createInput = require("../../components/Input");
const createButton = require("../../components/Button");

const generateLayout = require("../../utils/LayoutGenerator");
const {generatePalette} = require("../../utils/ColorGenerator");

function generateRegisterTemplate(designId) {

    //---------------------------------------
    // Builder
    //---------------------------------------

    const builder = new DesignBuilder(designId, "register");

    //---------------------------------------
    // Random Layout & Theme
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
    // Measurements
    //---------------------------------------

    const formWidth =
        layout.type === "mobile"
            ? layout.width - (layout.margin * 2)
            : 460;

    const startX = Math.round((layout.width - formWidth) / 2);

    let currentY = 40;

    //---------------------------------------
    // Logo
    //---------------------------------------

    builder.addNode(createImage({

        name: "Company Logo",

        x: Math.round((layout.width - 120) / 2),

        y: currentY,

        width: 120,

        height: 120,

        parentId: frame.nodeId

    }));

    currentY += 145;

    //---------------------------------------
    // Title
    //---------------------------------------

    builder.addNode(createText({

        text: "Create Your Account",

        x: startX,

        y: currentY,

        width: formWidth,

        fontSize: 32,

        parentId: frame.nodeId,

        color: palette.text

    }));

    currentY += 55;

    //---------------------------------------
    // Subtitle
    //---------------------------------------

    builder.addNode(createText({

        text: "Register to continue",

        x: startX,

        y: currentY,

        width: formWidth,

        fontSize: 16,

        parentId: frame.nodeId,

        color: palette.text

    }));

    currentY += 45;

    //---------------------------------------
    // Full Name
    //---------------------------------------

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

    //---------------------------------------
    // Email
    //---------------------------------------

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

    //---------------------------------------
    // Password
    //---------------------------------------

    builder.addNode(createText({

        text: "Password",

        x: startX,

        y: currentY,

        fontSize: 16,

        parentId: frame.nodeId,

        color: palette.text

    }));

    currentY += 25;

    builder.addNode(createInput({

        placeholder: "Create a password",

        x: startX,

        y: currentY,

        width: formWidth,

        parentId: frame.nodeId

    }));

    currentY += 70;

    //---------------------------------------
    // Confirm Password
    //---------------------------------------

    builder.addNode(createText({

        text: "Confirm Password",

        x: startX,

        y: currentY,

        fontSize: 16,

        parentId: frame.nodeId,

        color: palette.text

    }));

    currentY += 25;

    builder.addNode(createInput({

        placeholder: "Confirm your password",

        x: startX,

        y: currentY,

        width: formWidth,

        parentId: frame.nodeId

    }));

    currentY += 80;

    //---------------------------------------
    // Register Button
    //---------------------------------------

    builder.addNode(createButton({

        text: "Register",

        x: startX,

        y: currentY,

        width: formWidth,

        height: 50,

        color: palette.primary,

        parentId: frame.nodeId,

        mainComponentId: "primary_button"

    }));

    currentY += 70;

    //---------------------------------------
    // Login Link
    //---------------------------------------

    builder.addNode(createText({

        text: "Already have an account? Login",

        x: startX,

        y: currentY,

        width: formWidth,

        fontSize: 14,

        parentId: frame.nodeId,

        color: palette.primary

    }));

    currentY += 60;

    //---------------------------------------
    // Footer
    //---------------------------------------

    builder.addNode(createText({

        text: "© 2026 UX Dataset Generator",

        x: startX,

        y: currentY,

        width: formWidth,

        fontSize: 12,

        parentId: frame.nodeId,

        color: palette.text

    }));

    //---------------------------------------
    // Export
    //---------------------------------------

    return builder.export();

}

module.exports = generateRegisterTemplate;