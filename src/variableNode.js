'use strict';

const guuid = '9c482028-5b3e-11e7-907b-a6006ad3dba0';

/**
 * variable map
 */

let VariableNode = function(id, from) {
    this.id = id;
    this.guuid = guuid;
    this.from = from;
};

VariableNode.prototype.getRoot = function() {
    return this.from;
};

VariableNode.isVariableNode = (v) => v && typeof v === 'object' && v.guuid === guuid;

module.exports = VariableNode;
