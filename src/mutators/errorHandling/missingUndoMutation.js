function normalize(text) {

    return String(text || "")
        .toLowerCase()
        .trim();

}

const DESTRUCTIVE_KEYWORDS = [

    "delete",
    "remove",
    "reset",
    "discard",
    "clear",
    "erase"

];

const UNDO_KEYWORDS = [

    "undo",
    "restore",
    "recover",
    "revert"

];

function isDestructive(node) {

    const label = normalize(`${node.name} ${node.text}`);

    return DESTRUCTIVE_KEYWORDS.some(keyword =>
        label.includes(keyword)
    );

}

function isUndo(node) {

    const label = normalize(`${node.name} ${node.text}`);

    return UNDO_KEYWORDS.some(keyword =>
        label.includes(keyword)
    );

}

function injectMissingUndo(design) {

    if (!design || !Array.isArray(design.nodes)) {

        return null;

    }

    //----------------------------------------------------
    // Find destructive actions
    //----------------------------------------------------

    const destructiveNodes = design.nodes.filter(isDestructive);

    if (destructiveNodes.length === 0) {

        return null;

    }

    //----------------------------------------------------
    // Find undo controls
    //----------------------------------------------------

    const undoNodes = design.nodes.filter(isUndo);

    if (undoNodes.length === 0) {

        return null;

    }

    //----------------------------------------------------
    // Pick one undo node
    //----------------------------------------------------

    const selectedUndo = undoNodes[
        Math.floor(Math.random() * undoNodes.length)
    ];

    //----------------------------------------------------
    // Remove it
    //----------------------------------------------------

    design.nodes = design.nodes.filter(
        node => node.nodeId !== selectedUndo.nodeId
    );

    //----------------------------------------------------
    // Remove children (if any)
    //----------------------------------------------------

    design.nodes = design.nodes.filter(
        node => node.parentId !== selectedUndo.nodeId
    );

    //----------------------------------------------------
    // Annotation
    //----------------------------------------------------

    return {

        issue: "destructive_without_undo",

        destructiveNode:

            destructiveNodes[
                Math.floor(Math.random() * destructiveNodes.length)
            ].nodeId,

        removedUndoNode: selectedUndo.nodeId,

        removedUndoLabel: selectedUndo.text || selectedUndo.name

    };

}

module.exports = injectMissingUndo;