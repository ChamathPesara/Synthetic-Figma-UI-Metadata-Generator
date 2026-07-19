function normalize(text) {

    return String(text || "")
        .toLowerCase()
        .trim();

}

const DESTRUCTIVE_ACTIONS = [

    "delete",
    "remove",
    "reset",
    "erase",
    "discard",
    "clear"

];

const CONFIRMATION_KEYWORDS = [

    "confirm",
    "confirmation",
    "are you sure",
    "yes",
    "no"

];

function isDestructive(node) {

    const label = normalize(`${node.name} ${node.text}`);

    return DESTRUCTIVE_ACTIONS.some(keyword =>
        label.includes(keyword)
    );

}

function isConfirmation(node) {

    const label = normalize(`${node.name} ${node.text}`);

    return CONFIRMATION_KEYWORDS.some(keyword =>
        label.includes(keyword)
    );

}

function injectMissingConfirmation(design) {

    if (!design || !Array.isArray(design.nodes)) {

        return null;

    }

    //---------------------------------------------------
    // Find destructive actions
    //---------------------------------------------------

    const destructiveNodes = design.nodes.filter(node =>

        isDestructive(node)

    );

    if (destructiveNodes.length === 0) {

        return null;

    }

    //---------------------------------------------------
    // Find confirmation dialogs
    //---------------------------------------------------

    const confirmationNodes = design.nodes.filter(node =>

        isConfirmation(node) ||

        node.type === "MODAL"

    );

    //---------------------------------------------------
    // No confirmation already
    //---------------------------------------------------

    if (confirmationNodes.length === 0) {

        return null;

    }

    //---------------------------------------------------
    // Remove confirmation dialog(s)
    //---------------------------------------------------

    const removedNodeIds = [];

    design.nodes = design.nodes.filter(node => {

        const remove = confirmationNodes.includes(node);

        if (remove) {

            removedNodeIds.push(node.nodeId);

        }

        return !remove;

    });

    //---------------------------------------------------
    // Remove children belonging to removed dialogs
    //---------------------------------------------------

    design.nodes = design.nodes.filter(node =>

        !removedNodeIds.includes(node.parentId)

    );

    //---------------------------------------------------
    // Annotation
    //---------------------------------------------------

    return {

        issue: "irreversible_without_confirmation",

        destructiveNode:

            destructiveNodes[

                Math.floor(Math.random() * destructiveNodes.length)

            ].nodeId,

        removedConfirmationNodes: removedNodeIds,

        removedCount: removedNodeIds.length

    };

}

module.exports = injectMissingConfirmation;