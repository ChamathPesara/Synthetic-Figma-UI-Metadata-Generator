const DesignBuilder = require("../../builders/DesignBuilder");

const createFrame = require("../../components/Frame");
const createImage = require("../../components/Image");
const createText = require("../../components/Text");
const createInput = require("../../components/Input");
const createButton = require("../../components/Button");

const generateLayout = require("../../utils/LayoutGenerator");
const {generatePalette} = require("../../utils/ColorGenerator");

function generateLoginTemplate(designId) {

    //---------------------------------------
    // Builder
    //---------------------------------------

    const builder = new DesignBuilder(designId, "login");

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
    // Layout Measurements
    //---------------------------------------

    const formWidth =
    layout.type === "mobile"
        ? layout.width - layout.margin * 2
        : 420;

    const centerX = layout.width / 2;

    const startX = Math.round((layout.width - formWidth) / 2);

    let currentY = 60;

    //---------------------------------------
    // Logo
    //---------------------------------------

    builder.addNode(createImage({

        name: "Company Logo",

        x: Math.round(centerX - 60),

        y: currentY,

        width: 120,

        height: 120,

        parentId: frame.nodeId

    }));

    currentY += 150;

    //---------------------------------------
    // Welcome
    //---------------------------------------

    builder.addNode(createText({

        text: "Welcome Back",

        x: startX,

        y: currentY,

        width: formWidth,

        fontSize: 34,

        parentId: frame.nodeId,

        color: palette.text

    }));

    currentY += layout.spacing;

    //---------------------------------------
    // Email Label
    //---------------------------------------

    builder.addNode(createText({

        text: "Email",

        x: startX,

        y: currentY,

        fontSize: 16,

        parentId: frame.nodeId,

        color: palette.text

    }));

    currentY += 28;

    //---------------------------------------
    // Email Input
    //---------------------------------------

    builder.addNode(createInput({

        placeholder: "Enter your email",

        x: startX,

        y: currentY,

        width: formWidth,

        parentId: frame.nodeId

    }));

    currentY += 80;

    //---------------------------------------
    // Password Label
    //---------------------------------------

    builder.addNode(createText({

        text: "Password",

        x: startX,

        y: currentY,

        fontSize: 16,

        parentId: frame.nodeId,

        color: palette.text

    }));

    currentY += 28;

    //---------------------------------------
    // Password Input
    //---------------------------------------

    builder.addNode(createInput({

        placeholder: "Enter your password",

        x: startX,

        y: currentY,

        width: formWidth,

        parentId: frame.nodeId

    }));

    currentY += 70;

    //---------------------------------------
    // Forgot Password
    //---------------------------------------

    builder.addNode(createText({

        text: "Forgot Password?",

        x: startX + 250,

        y: currentY,

        width: 170,

        fontSize: 14,

        parentId: frame.nodeId,

        color: palette.primary

    }));

    currentY += 45;

    //---------------------------------------
    // Login Button
    //---------------------------------------

    builder.addNode(createButton({

        text: "Login",

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
    // Register Button
    //---------------------------------------

    builder.addNode(createButton({

        text: "Register",

        x: startX,

        y: currentY,

        width: formWidth,

        height: 50,

        color: palette.secondary,

        parentId: frame.nodeId,

        mainComponentId: "secondary_button"

    }));

    currentY += 90;

    //---------------------------------------
    // Footer
    //---------------------------------------

    builder.addNode(createText({

        text: "© 2026 Dataset Generator",

        x: startX,

        y: currentY,

        width: formWidth,

        fontSize: 13,

        parentId: frame.nodeId,

        color: palette.text

    }));

    //---------------------------------------
    // Export
    //---------------------------------------

    return builder.export();

}

module.exports = generateLoginTemplate;