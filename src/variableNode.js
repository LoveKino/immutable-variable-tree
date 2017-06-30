'use strict';

const guuid = '9c482028-5b3e-11e7-907b-a6006ad3dba0';

/**
 * variable map
 */

let VariableNode = function(id, root, from) {
    this.id = id;
    this.guuid = guuid;
    this.root = root;
    this.from = from;
};

VariableNode.prototype.getRoot = function() {
    return this.root;
};

VariableNode.prototype.setFromVariable = function(prevVariable) {
    this.from = prevVariable;
};

VariableNode.isVariableNode = (v) => v && typeof v === 'object' && v.guuid === guuid;

module.exports = VariableNode;
