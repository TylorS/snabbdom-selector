import { VNode } from 'snabbdom/vnode';
import { Select, Selector } from './types';

export function curry2 (select: Select): Selector {
  return function selector (sel: string, vNode: VNode): any {
    switch (arguments.length) {
      case 0: return select;
      case 1: return (_vNode: VNode) => select(sel, _vNode);
      default: return select(sel, vNode);
    }
  } as Selector;
}
