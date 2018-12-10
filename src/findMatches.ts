import { VNode } from 'snabbdom/vnode';
import { querySelector } from './query';
import parentSymbol from './parent-symbol';

export function findMatches (cssSelector: string, vNode: VNode | undefined): Array<VNode> {
  if (!vNode) {
    return [];
  }
  traverseVNode(vNode, addParent); // add mapping to the parent selectorParser

  return querySelector(cssSelector, vNode);
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

  if (!vNode.data[parentSymbol as any]) {
    Object.defineProperty(vNode.data, parentSymbol, {
      value: parent,
    });
  }
}
