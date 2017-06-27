'use strict';

const guuid = '9c482028-5b3e-11e7-907b-a6006ad3dba0';

/**
 * variable map
 */

let VariableNode = function(id, root) {
    this.id = id;
    this.guuid = guuid;
    this.root = root;
};

VariableNode.prototype.getRoot = function() {
    return this.root;
};

VariableNode.prototype.fromVariable = function(prevVariable) {
    this.from = prevVariable;
};

VariableNode.isVariableNode = (v) => v && typeof v === 'object' && v.guuid === guuid;

module.exports = VariableNode;
