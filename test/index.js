'use strict';

let Immutable = require('..');
let assert = require('assert');

describe('index', () => {
    it('atom', () => {
        let {
            get, atom
        } = Immutable();

        let v1 = atom(1);
        assert.equal(get(v1), 1);
    });

    it('collection', () => {
        let {
            get, collection
        } = Immutable();

        let v1 = collection([1, 2, 3]);

        assert.equal(get(v1, '0'), 1);
        assert.equal(get(v1, '1'), 2);
        assert.equal(get(v1, '2'), 3);
    });
});
