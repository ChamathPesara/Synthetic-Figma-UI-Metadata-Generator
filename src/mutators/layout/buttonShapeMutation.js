function randomChoice(array) {

    return array[Math.floor(Math.random() * array.length)];

}

const BUTTON_KEYWORDS = [

    "button",
    "login",
    "register",
    "submit",
    "save",
    "delete",
    "remove",
    "reset",
    "confirm",
    "continue",
    "next"

];

function normalize(text) {

    return String(text || "")
        .toLowerCase()
        .trim();

}

function isButton(node) {

    const label = normalize(`${node.name} ${node.text}`);

    const hasKeyword = BUTTON_KEYWORDS.some(keyword =>
        label.includes(keyword)
    );

    const hasShape =

        Number(node.width) >= 40 &&
        Number(node.height) >= 20;

    return hasKeyword || hasShape;

}

function injectButtonShapeMutation(design) {

    if (!design || !Array.isArray(design.nodes)) {

        return null;

    }

    //----------------------------------------------------
    // Find buttons
    //----------------------------------------------------

    const buttons = design.nodes.filter(isButton);

    if (buttons.length < 2) {

        return null;

    }

    //----------------------------------------------------
    // Select one button
    //----------------------------------------------------

    const button = randomChoice(buttons);

    //----------------------------------------------------
    // Save original values
    //----------------------------------------------------

    const original = {

        width: button.width,
        height: button.height,
        cornerRadius: button.cornerRadius || 8

    };

    //----------------------------------------------------
    // Choose mutation type
    //----------------------------------------------------

    const mutation = randomChoice([

        "cornerRadius",
        "width",
        "height",
        "multiple"

    ]);

    //----------------------------------------------------
    // Apply mutation
    //----------------------------------------------------

    switch (mutation) {

        case "cornerRadius":

            button.cornerRadius =

                randomChoice([

                    0,
                    2,
                    4,
                    24,
                    32,
                    40

                ]);

            break;

        case "width":

            button.width +=

                randomChoice([

                    -70,
                    -50,
                    50,
                    80,
                    100

                ]);

            break;

        case "height":

            button.height +=

                randomChoice([

                    -18,
                    -12,
                    12,
                    18,
                    24

                ]);

            break;

        case "multiple":

            button.width +=

                randomChoice([-60, 60, 90]);

            button.height +=

                randomChoice([-15, 15]);

            button.cornerRadius =

                randomChoice([

                    0,
                    2,
                    30,
                    36

                ]);

            break;

    }

    //----------------------------------------------------
    // Prevent invalid sizes
    //----------------------------------------------------

    button.width = Math.max(50, button.width);

    button.height = Math.max(24, button.height);

    //----------------------------------------------------
    // Annotation
    //----------------------------------------------------

    return {

        issue: "button_shape_inconsistency",

        modifiedNode: button.nodeId,

        mutation,

        original,

        updated: {

            width: button.width,

            height: button.height,

            cornerRadius: button.cornerRadius

        }

    };

}

module.exports = injectButtonShapeMutation;