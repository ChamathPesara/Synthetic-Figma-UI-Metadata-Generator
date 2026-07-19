class DesignBuilder {

    constructor(designId, screenType) {

        this.designId = designId;
        this.screenType = screenType;

        this.nodes = [];
        this.groundTruth = [];

    }

    addNode(node) {

        this.nodes.push(node);

        return node;
    }

    addNodes(nodes) {

        this.nodes.push(...nodes);

        return nodes;
    }

    getNode(nodeId) {

        return this.nodes.find(node => node.nodeId === nodeId);

    }

    getNodesByType(type) {

        return this.nodes.filter(node => node.type === type);

    }

    addGroundTruth(issue) {

        if (!this.groundTruth.includes(issue))

            this.groundTruth.push(issue);

    }

    hasGroundTruth(issue) {

        return this.groundTruth.includes(issue);

    }

    export() {

        return {

            designId: this.designId,

            screenType: this.screenType,

            nodeCount: this.nodes.length,

            groundTruth: this.groundTruth,

            nodes: this.nodes

        };

    }

}

module.exports = DesignBuilder;