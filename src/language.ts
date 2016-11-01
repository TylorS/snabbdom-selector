import * as cssauron from 'cssauron';
import * as snabbdom from 'snabbdom';
import { selectorParser } from './selectorParser';
import { classNameFromVNode } from './classNameFromVNode';

export const language = cssauron({
  tag: (vNode: snabbdom.VNode) => selectorParser(vNode).tagName,
  class: (vNode: snabbdom.VNode) => classNameFromVNode(vNode),
  id: (vNode: snabbdom.VNode) => selectorParser(vNode).id,
  children: (vNode: snabbdom.VNode) => vNode.children || [],
  parent: (vNode: snabbdom.VNode) => (vNode.data as any).parent || vNode,
  contents: (vNode: snabbdom.VNode) => vNode.text,
  attr (vNode: snabbdom.VNode, attr: string) {
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
