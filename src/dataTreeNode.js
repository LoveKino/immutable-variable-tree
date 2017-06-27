'use strict';

/**
 * variable map
 */

let DataTreeNode = function() {
    // used to store value for each variable
    // [variable-id] = {type, value}
    this.valueMap = {};
};

DataTreeNode.prototype.setChildren = function(children) {
    this.midType = null;

    // support children as hashmap or array
    if (children) {
        if (Array.isArray(children)) {
            this.midType = 'array';
        } else if (children && typeof children === 'object') {
            this.midType = 'hashMap';
        }
        this.children = children;
    }
};

DataTreeNode.prototype.associate = function(id, value) {
    this.valueMap[id] = {
        value
    };
};

DataTreeNode.prototype.getVariableValue = function(variableNode) {
    let valueNode = this.valueMap[variableNode.id];
    if (!valueNode) {
        throw new Error(`missing value for variable with id ${variableNode.id}`);
    }

    return valueNode.value;
};

DataTreeNode.prototype.getChild = function(key) {
    let childNode = this.children[key];
    if (!childNode) {
        throw new Error(`missing child for key ${key}`);
    }

    return childNode;
};

DataTreeNode.prototype.getDescendant = function(path = '') {
    if (path === '') return this;
    if (typeof path !== 'string') {
        throw new Error(`wrong path when try to get descendant from data tree node. path is ${path}`);
    }

    // find the data node
    let top = this;
    let parts = path.split('.');
    let len = parts.length;
    for (let i = 0; i < len; i++) {
        top = top.getChild(parts[i]);
    }

    return top;
};

module.exports = DataTreeNode;
