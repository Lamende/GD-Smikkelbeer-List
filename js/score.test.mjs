import test from 'node:test';
import assert from 'node:assert/strict';
import { score } from './score.js';

test('completed levels scale from 50 points down to 1', () => {
    assert.equal(score(1, 100, 1, 10), 50);
    assert.equal(score(10, 100, 1, 10), 1);
});

test('new levels keep the scale consistent', () => {
    assert.equal(score(1, 100, 1, 11), 50);
    assert.equal(score(11, 100, 1, 11), 1);
});
