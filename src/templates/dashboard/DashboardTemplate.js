const DesignBuilder = require("../../builders/DesignBuilder");

const createFrame = require("../../components/Frame");
const createNavbar = require("../../components/NavBar");
const createCard = require("../../components/Card");
const createText = require("../../components/Text");
const createButton = require("../../components/Button");

const generateLayout = require("../../utils/LayoutGenerator");
const {generatePalette} = require("../../utils/ColorGenerator");

function generateDashboardTemplate(designId) {

    //-----------------------------------------
    // Builder
    //-----------------------------------------

    const builder = new DesignBuilder(designId, "dashboard");

    //-----------------------------------------
    // Layout & Palette
    //-----------------------------------------

    const layout = generateLayout();
    const palette = generatePalette();

    //-----------------------------------------
    // Frame
    //-----------------------------------------

    const frame = createFrame({

        width: layout.width,
        height: layout.height,
        color: palette.background

    });

    builder.addNode(frame);

    //-----------------------------------------
    // Navbar
    //-----------------------------------------

    const navbar = createNavbar({

        width: layout.width,
        height: 70,
        parentId: frame.nodeId,
        title: "Dashboard"

    });

    navbar.fillColor = palette.primary;

    builder.addNode(navbar);

    //-----------------------------------------
    // Sidebar
    //-----------------------------------------

    const sidebar = createFrame({

        width: 220,
        height: layout.height - 70,
        color: palette.surface,
        parentId: frame.nodeId

    });

    sidebar.name = "Sidebar";
    sidebar.x = 0;
    sidebar.y = 70;

    builder.addNode(sidebar);

    //-----------------------------------------
    // Sidebar Menu
    //-----------------------------------------

    const menuItems = [

        "Dashboard",
        "Analytics",
        "Users",
        "Reports",
        "Settings",
        "Logout"

    ];

    let menuY = 100;

    menuItems.forEach(item => {

        builder.addNode(createText({

            text: item,

            x: 30,

            y: menuY,

            width: 160,

            fontSize: 18,

            parentId: sidebar.nodeId,

            color: palette.text

        }));

        menuY += 55;

    });

    //-----------------------------------------
    // Welcome Title
    //-----------------------------------------

    builder.addNode(createText({

        text: "Welcome Back",

        x: 260,

        y: 110,

        width: 350,

        fontSize: 34,

        parentId: frame.nodeId,

        color: palette.text

    }));

    //-----------------------------------------
    // Dashboard Cards
    //-----------------------------------------

    const cardWidth = 240;
    const cardHeight = 140;
    const spacing = 30;

    const cardTitles = [

        "Users",
        "Sales",
        "Orders",
        "Revenue"

    ];

    const cardValues = [

        "1,280",
        "$18,300",
        "425",
        "$42,900"

    ];

    for (let i = 0; i < 4; i++) {

        const x = 260 + (i * (cardWidth + spacing));
        const y = 180;

        const card = createCard({

            x,
            y,
            width: cardWidth,
            height: cardHeight,
            parentId: frame.nodeId,
            name: cardTitles[i]

        });

        card.fillColor = palette.surface;

        builder.addNode(card);

        builder.addNode(createText({

            text: cardTitles[i],

            x: x + 20,

            y: y + 20,

            width: 160,

            fontSize: 18,

            parentId: card.nodeId,

            color: palette.text

        }));

        builder.addNode(createText({

            text: cardValues[i],

            x: x + 20,

            y: y + 70,

            width: 160,

            fontSize: 32,

            parentId: card.nodeId,

            color: palette.primary

        }));

    }

    //-----------------------------------------
    // Recent Activity Card
    //-----------------------------------------

    const activityCard = createCard({

        x: 260,

        y: 380,

        width: 520,

        height: 320,

        parentId: frame.nodeId,

        name: "Recent Activity"

    });

    activityCard.fillColor = palette.surface;

    builder.addNode(activityCard);

    builder.addNode(createText({

        text: "Recent Activity",

        x: 280,

        y: 405,

        width: 250,

        fontSize: 24,

        parentId: activityCard.nodeId,

        color: palette.text

    }));

    const activities = [

        "John created a report",
        "Emily updated profile",
        "Payment received",
        "Server backup completed",
        "New user registered"

    ];

    let activityY = 450;

    activities.forEach(activity => {

        builder.addNode(createText({

            text: activity,

            x: 285,

            y: activityY,

            width: 420,

            fontSize: 16,

            parentId: activityCard.nodeId,

            color: palette.text

        }));

        activityY += 45;

    });

    //-----------------------------------------
    // Quick Actions Card
    //-----------------------------------------

    const quickCard = createCard({

        x: 820,

        y: 380,

        width: 360,

        height: 320,

        parentId: frame.nodeId,

        name: "Quick Actions"

    });

    quickCard.fillColor = palette.surface;

    builder.addNode(quickCard);

    builder.addNode(createText({

        text: "Quick Actions",

        x: 840,

        y: 405,

        width: 250,

        fontSize: 24,

        parentId: quickCard.nodeId,

        color: palette.text

    }));

    const actions = [

        "Create User",
        "Generate Report",
        "Settings"

    ];

    let buttonY = 460;

    actions.forEach(action => {

        builder.addNode(createButton({

            text: action,

            x: 850,

            y: buttonY,

            width: 300,

            height: 48,

            color: palette.primary,

            parentId: quickCard.nodeId,

            mainComponentId: "dashboard_action_button"

        }));

        buttonY += 70;

    });

    //-----------------------------------------
    // Export
    //-----------------------------------------

    return builder.export();

}

module.exports = generateDashboardTemplate;