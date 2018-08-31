import { Options, createQuerySelector, createMatches, Selector } from 'tree-selector';
import { VNode } from 'snabbdom/vnode';
import { selectorParser } from './selectorParser';
import { classNameFromVNode } from './classNameFromVNode';
import parentSymbol from './parent-symbol';
import { Select } from './types';

const options: Options<VNode> = {
  tag: (vNode: VNode) => selectorParser(vNode).tagName,
  className: (vNode: VNode) => classNameFromVNode(vNode),
  id: (vNode: VNode) => selectorParser(vNode).id || '',
  children: (vNode: VNode) => vNode.children || [],
  parent: (vNode: VNode) => (vNode.data as any)[parentSymbol] || vNode,
  contents: (vNode: VNode) => vNode.text || '',
  attr (vNode: VNode, attr: string) {
    if (vNode.data) {
      const { attrs = {}, props = {}, dataset = {} } = vNode.data;
      if (attrs[attr]) {
        return attrs[attr];
      }
      if (props[attr]) {
        return props[attr];
      }
      if (attr.indexOf('data-') === 0 && dataset[attr.slice(5)]) {
        return dataset[attr.slice(5)];
      }
    }
  },
};

const matches = createMatches(options);

function customMatches(sel: string | Selector, vnode: VNode): VNode | boolean {
  const { data } = vnode;
  const selector = matches.bind(null, sel);

  if (data && data.fn) {
    let n: VNode;
    if (Array.isArray(data.args)) {
      n = data.fn.apply(null, data.args);
    } else if (data.args) {
      n = data.fn.call(null, data.args);
    } else {
      n = data.fn();
    }
    return selector(n) ? n : false;
  }
  return selector(vnode);
}

export const querySelector: Select = createQuerySelector(options, customMatches) as any;
