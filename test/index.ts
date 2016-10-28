import * as assert from 'assert';
import { select } from '../src';
import snabbdom = require('snabbdom');

type hyperscript =
  (selector: string, data: any, children: snabbdom.VNode[]) => snabbdom.VNode;

const h: hyperscript = require('snabbdom/h');

function div (children: snabbdom.VNode[] = []): snabbdom.VNode {
  return h('div', {}, children);
}

describe('select', () => {
  it('should be a function', () => {
    assert.strictEqual(typeof select, 'function');
  });

  it('should return an array', () => {
    assert(Array.isArray(select('', div())));
  });

  it('should be a curried function', () => {
    assert.strictEqual(typeof select(''), 'function');
  });

  describe('given a slector and a VNode', () => {

  });
});
