'use strict';

let DataTreeNode = require('./dataTreeNode');
let VariableNode = require('./variableNode');

module.exports = () => {
    let variableCount = 0;
    // hashMap for variables
    let variableMap = {};

    let set = (source, path, value) => {
        let tree = source.getRoot();
        let variableNode = create(tree);
        variableNode.fromVariable(source);

        // find the data node
        let child = tree.getDescendant(path);

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

        let valueNode = child.getVariableValueNode(variableNode);

        if (valueNode) {
            return valueNode.value;
        } else {
            let from = variableNode.from;
            if (from) {
                let fromValueNode = child.getVariableValueNode(from);
                if (fromValueNode) return fromValueNode.value;
            }
        }
    };

    let create = (tree) => {
        let id = ++variableCount;
        let variableNode = new VariableNode(id, tree);
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
        let tree = new DataTreeNode();
        let variableNode = create(tree);

        let children = null;
        if (Array.isArray(values)) {
            children = [];
            let childLen = values.length;
            for (let i = 0; i < childLen; i++) {
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
        } else {
            throw new Error(`expect collection type, array or map, but got ${values}`);
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
