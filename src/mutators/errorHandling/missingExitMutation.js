function normalize(text) {

    return String(text || "")
        .toLowerCase()
        .trim();

}

const EXIT_KEYWORDS = [

    "back",
    "cancel",
    "close",
    "x",
    "dismiss",
    "return"

];

function isExitControl(node) {

    const label = normalize(`${node.name} ${node.text}`);

    return EXIT_KEYWORDS.some(keyword =>
        label.includes(keyword)
    );

}

function injectMissingExit(design) {

    if (!design || !Array.isArray(design.nodes)) {

        return null;

    }

    //--------------------------------------------------
    // Find exit controls
    //--------------------------------------------------

    const exitControls = design.nodes.filter(isExitControl);

    if (exitControls.length === 0) {

        return null;

    }

    //--------------------------------------------------
    // Randomly remove ONE exit control
    //--------------------------------------------------

    const selectedExit =
        exitControls[
            Math.floor(Math.random() * exitControls.length)
        ];

    design.nodes = design.nodes.filter(node =>
        node.nodeId !== selectedExit.nodeId
    );

    //--------------------------------------------------
    // Remove child nodes (if any)
    //--------------------------------------------------

    design.nodes = design.nodes.filter(node =>
        node.parentId !== selectedExit.nodeId
    );

    //--------------------------------------------------
    // Annotation
    //--------------------------------------------------

    return {

        issue: "missing_exit_control",

        removedNode: selectedExit.nodeId,

        removedLabel: selectedExit.text || selectedExit.name,

        parentFrame: selectedExit.parentId

    };

}

module.exports = injectMissingExit;