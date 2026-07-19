const EXIT_KEYWORDS = [
    "close",
    "cancel",
    "back",
    "dismiss",
    "return"
];

const MODAL_KEYWORDS = [
    "modal",
    "dialog",
    "popup",
    "overlay"
];

const BUTTON_KEYWORDS = [
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

function normalize(value) {

    return String(value || "")
        .toLowerCase()
        .trim();

}

function label(node) {

    return normalize(`${node.name || ""} ${node.text || ""}`);

}

function containsKeyword(node, keywords) {

    const text = label(node);

    return keywords.some(keyword => text.includes(keyword));

}

function getFrames(nodes) {

    return nodes.filter(node =>
        ["FRAME","GROUP","COMPONENT","INSTANCE","MODAL"]
            .includes(node.type)
    );

}

function getChildren(nodes,parentId){

    return nodes.filter(node=>node.parentId===parentId);

}

function isButton(node){

    if(node.type !== "RECTANGLE")
        return false;

    return containsKeyword(node,BUTTON_KEYWORDS);

}

/*------------------------------------------------*/
/* Modal Without Exit */
/*------------------------------------------------*/

function hasModalWithoutExit(nodes){

    const frames=getFrames(nodes);

    return frames.some(frame=>{

        const children=getChildren(nodes,frame.nodeId);

        const modalLike=

            containsKeyword(frame,MODAL_KEYWORDS) ||

            frame.type==="MODAL";

        if(!modalLike)
            return false;

        const exits=children.filter(child=>

            containsKeyword(child,EXIT_KEYWORDS)

        );

        return exits.length===0;

    });

}

/*------------------------------------------------*/
/* Spacing Inconsistency */
/*------------------------------------------------*/

function hasSpacingInconsistency(nodes){

    const spacingNodes=

        nodes.filter(node=>

            Number.isFinite(node.itemSpacing)

        );

    if(spacingNodes.length<2)
        return false;

    const values=

        spacingNodes.map(node=>node.itemSpacing);

    const average=

        values.reduce((a,b)=>a+b,0)/values.length;

    return values.some(value=>

        Math.abs(value-average)>20

    );

}

/*------------------------------------------------*/
/* Button Shape Inconsistency */
/*------------------------------------------------*/

function hasButtonShapeInconsistency(nodes){

    const buttons=nodes.filter(isButton);

    if(buttons.length<2)
        return false;

    const radius=

        buttons.map(button=>button.cornerRadius||0);

    const average=

        radius.reduce((a,b)=>a+b,0)/radius.length;

    return radius.some(value=>

        Math.abs(value-average)>10

    );

}

/*------------------------------------------------*/
/* Alignment Inconsistency */
/*------------------------------------------------*/

function hasAlignmentInconsistency(nodes){

    const visible=

        nodes.filter(node=>

            Number.isFinite(node.x)

        );

    if(visible.length<4)
        return false;

    const xs=visible.map(node=>node.x);

    const average=

        xs.reduce((a,b)=>a+b,0)/xs.length;

    return xs.some(x=>

        Math.abs(x-average)>120

    );

}

/*------------------------------------------------*/
/* Overloaded Screen */
/*------------------------------------------------*/

function hasOverloadedScreen(nodes){

    const frames=getFrames(nodes);

    return frames.some(frame=>{

        const children=

            getChildren(nodes,frame.nodeId);

        return children.length>=18;

    });

}

/*------------------------------------------------*/
/* Main Validator */
/*------------------------------------------------*/

function validateLayoutDesign(design){

    const nodes=design.nodes||[];

    return{

        modalWithoutExit:

            hasModalWithoutExit(nodes),

        spacingInconsistency:

            hasSpacingInconsistency(nodes),

        buttonShapeInconsistency:

            hasButtonShapeInconsistency(nodes),

        alignmentInconsistency:

            hasAlignmentInconsistency(nodes),

        overloadedScreen:

            hasOverloadedScreen(nodes)

    };

}

module.exports={

    validateLayoutDesign

};