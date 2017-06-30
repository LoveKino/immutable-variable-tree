'use strict';

let DataTreeNode = require('./dataTreeNode');
let VariableNode = require('./variableNode');

module.exports = () => {
    let variableCount = 0;
    // hashMap for variables
    let variableMap = {};

    // immutable set method, which produce new variable
    let set = (source, path, value) => {
        if (!VariableNode.isVariableNode(source)) {
            throw new Error(`expect variable node, bug got ${source}`);
        }

        let tree = source.getRoot();
        let variableNode = create(tree, source); // create a new variable

        // find the data node
        let child = tree.getDescendantByCreating(path);

        // associate variable with value
        child.associate(variableNode.id, value);

        return variableNode;
    };

    let get = (variableNode, path) => {
        if (!VariableNode.isVariableNode(variableNode)) {
            throw new Error(`expect variable node, bug got ${variableNode}`);
        }

        let tree = variableNode.getRoot();
        let child = tree.getDescendant(path);

        return getNodeValue(child, variableNode);
    };

    let getNodeValue = (dataTreeNode, variableNode) => {
        let valueNode = dataTreeNode.getVariableValueNode(variableNode);

        if (valueNode) {
            return valueNode.value;
        } else {
            let from = variableNode.from;
            if (from) {
                return getNodeValue(dataTreeNode, from);
            }
        }
    };

    let create = (tree, from) => {
        let id = ++variableCount;
        let variableNode = new VariableNode(id, tree, from);
        variableMap[id] = variableNode;

        return variableNode;
    };

    let atom = (value) => {
        if (VariableNode.isVariableNode(value)) return value;
        let tree = new DataTreeNode();
        let variableNode = create(tree);
        tree.associate(variableNode.id, value);

        return variableNode;
    };

    let collection = (values) => {
        let type = Array.isArray(values) ? 'array' : values && typeof values === 'object' ? 'hashMap' : null;
        if (type === null) {
            throw new Error(`expect collection type, array or map, but got ${values}`);
        }
        let tree = new DataTreeNode(type);
        let variableNode = create(tree);

        let children = null;
        if (type === 'array') {
            children = [];
            let valLen = values.length;
            for (let i = 0; i < valLen; i++) {
                let child = new DataTreeNode();
                child.associate(variableNode.id, values[i]);
                children[i] = child;
            }
        } else if (values && typeof values === 'object') {
            children = {};
            for (let name in values) {
                let child = new DataTreeNode();
                child.associate(variableNode.id, values[name]);
                children[name] = child;
            }
        }

        tree.setChildren(children);

        return variableNode;
    };

    return {
        set,
        get,
        atom,
        collection
    };
};
