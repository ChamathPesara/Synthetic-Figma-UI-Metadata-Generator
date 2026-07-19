const createText = require("../../components/Text");
const createButton = require("../../components/Button");

function randomChoice(array) {

    return array[Math.floor(Math.random() * array.length)];

}

function random(min, max) {

    return Math.floor(Math.random() * (max - min + 1)) + min;

}

function injectDensityMutation(design) {

    if (!design || !Array.isArray(design.nodes)) {

        return null;

    }

    //----------------------------------------------------
    // Find frames
    //----------------------------------------------------

    const frames = design.nodes.filter(node =>
        node.type === "FRAME"
    );

    if (frames.length === 0) {

        return null;

    }

    //----------------------------------------------------
    // Select one frame
    //----------------------------------------------------

    const frame = randomChoice(frames);

    //----------------------------------------------------
    // Current children
    //----------------------------------------------------

    const children = design.nodes.filter(node =>
        node.parentId === frame.nodeId
    );

    //----------------------------------------------------
    // Choose mutation
    //----------------------------------------------------

    const mutation = randomChoice([

        "increase",
        "decrease"

    ]);

    const affectedNodes = [];

    //----------------------------------------------------
    // OVERLOADED SCREEN
    //----------------------------------------------------

    if (mutation === "increase") {

        const amount = random(8, 18);

        let y = 100;

        for (let i = 0; i < amount; i++) {

            if (Math.random() < 0.6) {

                const text = createText({

                    text: `Extra Item ${i + 1}`,

                    x: random(40, frame.width - 250),

                    y,

                    parentId: frame.nodeId

                });

                design.nodes.push(text);

                affectedNodes.push(text.nodeId);

            }

            else {

                const button = createButton({

                    text: `Button ${i + 1}`,

                    x: random(40, frame.width - 260),

                    y,

                    width: random(120, 220),

                    parentId: frame.nodeId

                });

                design.nodes.push(button);

                affectedNodes.push(button.nodeId);

            }

            y += random(35, 60);

        }

    }

    //----------------------------------------------------
    // SPARSE SCREEN
    //----------------------------------------------------

    else {

        const removable = children.filter(node =>

            node.type === "TEXT" ||

            node.type === "RECTANGLE"

        );

        const removeCount = Math.min(

            removable.length,

            random(4, 8)

        );

        for (let i = 0; i < removeCount; i++) {

            const node = removable[i];

            design.nodes = design.nodes.filter(item =>
                item.nodeId !== node.nodeId
            );

            affectedNodes.push(node.nodeId);

        }

    }

    //----------------------------------------------------
    // Annotation
    //----------------------------------------------------

    return {

        issue: "overloaded_screen",

        frameId: frame.nodeId,

        mutation,

        affectedNodes,

        addedOrRemoved: affectedNodes.length

    };

}

module.exports = injectDensityMutation;