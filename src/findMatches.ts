import { VNode } from 'snabbdom/vnode';
import { language } from './language';

export function findMatches (cssSelector: string, vNode: VNode): Array<VNode> {
  const selector = language(cssSelector);
  const matches: VNode[] = [];

  traverseVNode(vNode, addParent); // add mapping to the parent selectorParser

  traverseVNode(vNode, function (currentNode: VNode) {
    const { data } = currentNode;

    let result: any;

    if (data && data.fn) {
      if (Array.isArray(data.args)) {
        result = selector(data.fn.apply(null, data.args));
      } else if (data.args) {
        result = selector(data.fn.call(null, data.args));
      } else {
        result = selector(data.fn());
      }
    } else {
      result = selector(currentNode);
    }

    if (result) {
      if (!Array.isArray(result)) {
        result = [result];
      }

      matches.push.apply(matches, result);
    }
  });

  return matches;
}

function traverseVNode (vNode: VNode,
                        f: (vNode: VNode,
                            root: boolean,
                            parent?: VNode) => any): void {

  function recurse (currentNode: VNode, isParent: boolean, parentVNode?: VNode) {
    const length = currentNode.children && currentNode.children.length || 0;

    for (let i = 0; i < length; ++i) {
      const { children } = currentNode;

      if (children && children[i] && typeof children[i] !== 'string') {
        const child = children[i];
        recurse(child as VNode, false, currentNode);
      }
    }

    f(currentNode, isParent, isParent ? void 0 : parentVNode);
  }

  recurse(vNode, true);
}

function addParent (vNode: VNode, isParent: boolean, parent?: VNode): void {
  if (isParent) { return void 0; }

  if (!vNode.data) {
    vNode.data = {};
  }

  if (!(vNode.data as any).parent) {
    (vNode.data as any).parent = parent;
  }
}
