import * as snabbdom from 'snabbdom';
import { Select, Selector } from './types';

export function curry2 (select: Select): Selector {
  return function selector (selector: string, vNode: snabbdom.VNode): any {
    switch (arguments.length) {
      case 0: return select;
      case 1: return (_vNode: snabbdom.VNode) => select(selector, _vNode);
      default: return select(selector, vNode);
    }
  } as Selector;
};
