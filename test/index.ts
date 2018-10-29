import * as assert from 'assert';
import { select } from '../src';
import { VNode } from 'snabbdom/vnode';
import h from 'snabbdom/h';
import thunk from 'snabbdom/thunk';

function div (children: VNode[] = []): VNode {
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

  it('should accept undefined as the node parameter', () => {
    const result = select('div', undefined);
    assert.equal(result.length, 0);
  });

  describe('given a selector and a VNode', () => {

    it('should ignore falsy children', () => {
      assert.ok(select('', h('div', [, h('div')])));
    });

    it('should return an array of matching vNodes', () => {
      const vNode = h('div', {}, [
        h('h1.matches', {}, []),
        h('h2.nomatches', {}, []),
        h('h3.matches', {}, []),
      ]);

      const matches = select('.matches', vNode);

      assert.strictEqual(matches.length, 2);
    });

    it('should return a vNode by className selector', () => {
      const vNode = h('div.test', {}, []);
      const result = select('.test', vNode);
      assert.strictEqual('div.test', result[0].sel);
    });

    it('should return a vNode by className from props', () => {
      const vNode = h('div', { props: { className: 'test' } }, []);
      const result = select('.test', vNode);
      assert.strictEqual(result[0].sel, 'div');
      assert.strictEqual((result[0].data as any).props.className, 'test');
    });

    it('should return a vNode by className from class module', () => {
      const vNode = h('div', { class: { test: true } }, []);
      const result = select('.test', vNode);
      assert.strictEqual(result[0].sel, 'div');
      assert.strictEqual((result[0].data as any).class.test, true);
    });

    it('should return a vNode by className from all 3', () => {
      const vNode = h('div.test', {
        props: { className: 'anotherTest' },
        class: { theRealTest: true },
      }, []);

      const result = select('.test.anotherTest.theRealTest', vNode);
      assert.strictEqual(result[0].sel, 'div.test');
    });

    it('should return a vNode by ID from selector', () => {
      const vNode = div([
        h('h1#test', {}, []),
      ]);

      const result = select('#test', vNode);
      assert.strictEqual(result[0].sel, 'h1#test');
    });

    it('should return an array of vNodes that match selector', () => {
      const vNode = h('div#test', {}, [
        h('p.first', {}, []),
        h('p.second', {}, []),
        h('p.third', {}, []),
      ]);

      const result = select('p', vNode);

      assert.strictEqual(Array.isArray(result), true);
      assert.strictEqual(result.length, 3);
      assert.strictEqual(result[0].sel, 'p.first');
      assert.strictEqual(result[1].sel, 'p.second');
      assert.strictEqual(result[2].sel, 'p.third');
    });

    it('should match using `>`', () => {
      const vNode = h('div#test', {}, [
        h('p.foo', {}, []),
      ]);

      const result = select('#test > .foo', vNode);
      assert.strictEqual(result[0].sel, 'p.foo');
    });

    it('should match using `+`', () => {
      const vNode = h('div#test', {}, [
        h('div', {}, []),
        h('p.foo', {}, []),
      ]);

      const result = select('div + .foo', vNode);
      assert.strictEqual(result[0].sel, 'p.foo');
    });

    it('should match using `~`', () => {
      const vNode = h('div#test', {}, [
        h('ul', {}, []),
        h('p.foo', {}, []),
      ]);

      const result = select('ul ~ .foo', vNode);
      assert.strictEqual(result[0].sel, 'p.foo');
    });

    it('should match attribute', () => {
      const vNode = h('div#test', { attrs: { foo: 1 } }, [
        h('p.foo', {}, []),
      ]);
      const vNode2 = h('div#test', { attrs: { foo: 'foo' } }, [
        h('p.foo', {}, []),
      ]);

      const tests = [
        { selector: 'div[foo=1]', vNode: vNode },
        { selector: 'div[foo=foo]', vNode: vNode2 },
        { selector: 'div[foo="foo"]', vNode: vNode2 },
        { selector: 'div[foo]', vNode: vNode2 },
      ]

      tests.forEach(({ selector, vNode }) => {
        const result = select(selector, vNode);
        assert.strictEqual(result[0].sel, 'div#test');
      });
    });

    it('should be able to match thunks', () => {
      const exampleThunk = () => h('h2.thunk', {}, []);
      const vNode = h('div#test', {}, [
        thunk('div', 'thunk', exampleThunk, [7]),
      ]);

      const result = select('.thunk', vNode);
      assert.strictEqual(result[0].sel, 'h2.thunk');
    });

    describe('pseudo-selector', () => {
      it('should match using `:first-child`', () => {
        const vNode = div([
          h('p.foo', {}, []),
          h('p.bar', {}, []),
        ]);

        const result = select('p:first-child', vNode);
        assert.strictEqual(result[0].sel, 'p.foo');
      });

      it('should match using `:last-child`', () => {
        const vNode = div([
          h('p.foo', {}, []),
          h('p.bar', {}, []),
        ]);

        const result = select('p:last-child', vNode);
        assert.strictEqual(result[0].sel, 'p.bar');
      });

      it('should match using :contains(text)', () => {
        const vNode = div([
          h('p.foo', {}, 'foo'),
          h('p.bar', {}, 'bar'),
        ]);

        const result = select('p:contains("bar")', vNode);
        assert.strictEqual(result[0].sel, 'p.bar');
      });

      it('should match using `:nth-child`', () => {
        let children: VNode[] = [];
        for (let i = 0; i < 40; ++i) {
          children[i] = h('p', {}, `${i}`);
        }
        const vNode = div(children);

        const result = select('p:nth-child(30)', vNode);
        assert.strictEqual(result[0].sel, 'p');
        assert.strictEqual(result[0].text, '29');
      });
    });

    it('should not mutate the vNode tree visibly', () => {
      const tree1 = h('div', {}, [
        h('h1.matches', {}, []),
        h('h2.nomatches', {}, []),
        h('h3.matches', {}, []),
      ]);
      const tree2 = h('div', {}, [
        h('h1.matches', {}, []),
        h('h2.nomatches', {}, []),
        h('h3.matches', {}, []),
      ]);

      select('h1', tree1);
      assert.deepStrictEqual(tree1, tree2);
    });
  });
});
