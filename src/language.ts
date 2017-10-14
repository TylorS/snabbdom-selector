import cssauron from 'cssauron2';
import { VNode } from 'snabbdom/vnode';
import { selectorParser } from './selectorParser';
import { classNameFromVNode } from './classNameFromVNode';
import parentSymbol from './parent-symbol';

export const language = cssauron({
  tag: (vNode: VNode) => selectorParser(vNode).tagName,
  class: (vNode: VNode) => classNameFromVNode(vNode),
  id: (vNode: VNode) => selectorParser(vNode).id,
  children: (vNode: VNode) => vNode.children || [],
  parent: (vNode: VNode) => (vNode.data as any)[parentSymbol] || vNode,
  contents: (vNode: VNode) => vNode.text,
  attr (vNode: VNode, attr: string) {
    if (vNode.data) {
      const { attrs = {}, props = {} } = vNode.data;
      if (attrs[attr]) {
        return attrs[attr];
      }
      if (props[attr]) {
        return props[attr];
      }
    }
  },
});
