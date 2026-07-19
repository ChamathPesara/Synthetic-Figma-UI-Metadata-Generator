function randomChoice(array) {

    return array[Math.floor(Math.random() * array.length)];

}

function injectAlignmentMutation(design) {

    if (!design || !Array.isArray(design.nodes)) {

        return null;

    }

    //-------------------------------------------------------
    // Visible UI elements only
    //-------------------------------------------------------

    const candidates = design.nodes.filter(node => {

        return (

            node.type !== "FRAME" &&
            node.visible !== false &&
            Number.isFinite(Number(node.x)) &&
            Number.isFinite(Number(node.y))

        );

    });

    //-------------------------------------------------------

    if (candidates.length < 4) {

        return null;

    }

    //-------------------------------------------------------
    // Pick one element
    //-------------------------------------------------------

    const node = randomChoice(candidates);

    const original = {

        x: node.x,
        y: node.y

    };

    //-------------------------------------------------------
    // Horizontal or Vertical
    //-------------------------------------------------------

    const horizontal = Math.random() < 0.5;

    //-------------------------------------------------------
    // Large offset
    //-------------------------------------------------------

    const offset = 40 + Math.floor(Math.random() * 81);
    // 40 - 120 pixels

    if (horizontal) {

        node.x += Math.random() < 0.5 ? offset : -offset;

    }

    else {

        node.y += Math.random() < 0.5 ? offset : -offset;

    }

    //-------------------------------------------------------
    // Prevent negative coordinates
    //-------------------------------------------------------

    node.x = Math.max(0, node.x);
    node.y = Math.max(0, node.y);

    //-------------------------------------------------------
    // Annotation
    //-------------------------------------------------------

    return {

        issue: "alignment_inconsistency",

        modifiedNode: node.nodeId,

        originalPosition: original,

        newPosition: {

            x: node.x,
            y: node.y

        },

        direction: horizontal ? "horizontal" : "vertical",

        offset

    };

}

module.exports = injectAlignmentMutation;