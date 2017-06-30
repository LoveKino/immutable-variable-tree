'use strict';

let Immutable = require('..');
let assert = require('assert');

describe('set', () => {
    it('list', () => {
        let {
            set, get, collection
        } = Immutable();

        let v1 = collection([1, 2, 3]);
        let v2 = set(v1, '0', 100);

        assert.equal(get(v1, '0'), 1);
        assert.equal(get(v1, '1'), 2);
        assert.equal(get(v1, '2'), 3);

        assert.equal(get(v2, '0'), 100);
        assert.equal(get(v2, '1'), 2);
        assert.equal(get(v2, '2'), 3);
    });

    it('map', () => {
        let {
            set, get, collection
        } = Immutable();

        let v1 = collection({
            a: 1,
            b: 2
        });
        let v2 = set(v1, 'a', 100);

        assert.equal(get(v1, 'a'), 1);
        assert.equal(get(v1, 'b'), 2);

        assert.equal(get(v2, 'a'), 100);
        assert.equal(get(v2, 'b'), 2);
    });

    it('set new key in map', () => {
        let {
            set, get, collection
        } = Immutable();

        let v1 = collection({
            a: 1,
            b: 2
        });
        let v2 = set(v1, 'c', 3);

        assert.equal(get(v1, 'a'), 1);
        assert.equal(get(v1, 'b'), 2);
        assert.equal(get(v1, 'c'), undefined);

        assert.equal(get(v2, 'a'), 1);
        assert.equal(get(v2, 'b'), 2);
        assert.equal(get(v2, 'c'), 3);
    });

    it('set new key in array', () => {
        let {
            set, get, collection
        } = Immutable();

        let v1 = collection([1, 2]);
        let v2 = set(v1, 2, 4);

        assert.equal(get(v1, 0), 1);
        assert.equal(get(v1, 1), 2);
        assert.equal(get(v1, 2), undefined);

        assert.equal(get(v2, 0), 1);
        assert.equal(get(v2, 1), 2);
        assert.equal(get(v2, 2), 4);
    });

    it('set map continues', () => {
        let {
            set, get, collection
        } = Immutable();

        let v1 = collection({
            a: -1,
            b: 2
        });

        let variables = [v1];
        for (let i = 0; i < 100; i++) {
            let v = set(v1, 'a', i);
            variables.push(v);
        }

        for (let j = 0; j < variables.length; j++) {
            let v = variables[j];
            assert.equal(get(v, 'a'), j - 1);
            assert.equal(get(v, 'b'), 2);
        }
    });

    it('set key in a row', () => {
        let {
            set, get, collection
        } = Immutable();

        let v0 = collection([]);

        let prev = v0;
        for (let i = 0; i < 10; i++) {
            let next = set(prev, i, i);
            prev = next;
        }

        for (let j = 0; j < 10; j++) {
            assert.equal(get(prev, j), j);
        }
    });
});
