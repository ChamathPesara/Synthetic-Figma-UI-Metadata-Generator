function randomChoice(array) {

    return array[Math.floor(Math.random() * array.length)];

}

function random(min, max) {

    return Math.floor(Math.random() * (max - min + 1)) + min;

}

function injectSpacingMutation(design) {

    if (!design || !Array.isArray(design.nodes)) {

        return null;

    }

    //--------------------------------------------------
    // Components that already have spacing
    //--------------------------------------------------

    const candidates = design.nodes.filter(node =>

        node.itemSpacing != null

    );

    if (candidates.length < 2) {

        return null;

    }

    //--------------------------------------------------
    // Pick one component
    //--------------------------------------------------

    const component = randomChoice(candidates);

    const originalSpacing = component.itemSpacing;

    //--------------------------------------------------
    // Mutation style
    //--------------------------------------------------

    const mutation = randomChoice([

        "increase",

        "decrease",

        "extreme"

    ]);

    switch (mutation) {

        case "increase":

            component.itemSpacing += random(20, 60);

            break;

        case "decrease":

            component.itemSpacing = Math.max(

                0,

                component.itemSpacing - random(10, 25)

            );

            break;

        case "extreme":

            component.itemSpacing = randomChoice([

                0,
                2,
                4,
                40,
                60,
                80,
                120

            ]);

            break;

    }

    //--------------------------------------------------
    // Annotation
    //--------------------------------------------------

    return {

        issue: "spacing_inconsistency",

        modifiedNode: component.nodeId,

        originalSpacing,

        updatedSpacing: component.itemSpacing,

        mutation

    };

}

module.exports = injectSpacingMutation;