import * as snabbdom from 'snabbdom';
import { language } from './language';

export function findMatches (cssSelector: string, vNode: snabbdom.VNode): Array<snabbdom.VNode> {
  const selector = language(cssSelector);
  const matches: snabbdom.VNode[] = [];

  traverseVNode(vNode, addParent); // add mapping to the parent selectorParser

  traverseVNode(vNode, function (currentNode: snabbdom.VNode) {
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

function traverseVNode (vNode: snabbdom.VNode,
                        f: (vNode: snabbdom.VNode,
                            root: boolean,
                            parent?: snabbdom.VNode) => any): void {

  function recurse (currentNode: snabbdom.VNode, isParent: boolean, parentVNode?: snabbdom.VNode) {
    const length = currentNode.children && currentNode.children.length || 0;

    for (let i = 0; i < length; ++i) {
      const { children } = vNode;

      if (children && typeof children[i] !== 'string') {
        const child = children[i];
        recurse(child as snabbdom.VNode, false, currentNode);
      }
    }

    f(currentNode, isParent, isParent ? void 0 : parentVNode);
  }

  recurse(vNode, true);
}

function addParent (vNode: snabbdom.VNode, isParent: boolean, parent?: snabbdom.VNode): void {
  if (isParent) { return void 0; }

  if (!vNode.data) {
    vNode.data = {};
  }

  if (!(vNode.data as any).parent) {
    (vNode.data as any).parent = parent;
  }
}
