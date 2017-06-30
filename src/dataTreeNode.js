'use strict';

/**
 * variable map
 */

let DataTreeNode = function(midType) {
    // used to store value for each variable
    // [variable-id] = {type, value}
    this.valueMap = {};
    this.children = null;

    if (midType === 'array') {
        this.midType = 'array';
        this.children = [];
    } else if (midType === 'hashMap') {
        this.midType = 'hashMap';
        this.children = {};
    }
};

DataTreeNode.prototype.setChildren = function(children) {
    this.children = children;
};

/**
 * associate variable with value
 */
DataTreeNode.prototype.associate = function(id, value) {
    this.valueMap[id] = {
        value
    };
};

DataTreeNode.prototype.getVariableValueNode = function(variableNode) {
    return this.valueMap[variableNode.id];
};

DataTreeNode.prototype.getDescendant = function(path = '') {
    if (path === '') return this;
    path += '';

    // find the data node
    let top = this,
        parts = path.split('.'),
        len = parts.length;
    for (let i = 0; i < len; i++) {
        let key = parts[i];
        top = top.children[key];
        if (!top) return null;
    }

    return top;
};

/**
 * Get descendant, if not exist, creating node.
 */
DataTreeNode.prototype.getDescendantByCreating = function(path = '') {
    if (path === '') return this;
    path += '';

    // find the data node
    let top = this,
        parts = path.split('.'),
        len = parts.length;
    for (let i = 0; i < len; i++) {
        let key = parts[i];
        let next = top.children[key];
        if (!next) {
            next = top.children[key] = new DataTreeNode();
        }
        top = next;
    }

    return top;
};

module.exports = DataTreeNode;
