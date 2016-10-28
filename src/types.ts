import * as snabbdom from 'snabbdom';

export interface Selector {
  (selector: string, vNode: snabbdom.VNode): Array<snabbdom.VNode>;
  (selector: string): (vNode: snabbdom.VNode) => Array<snabbdom.VNode>;
}

export type Select =
  (selector: string, vNode: snabbdom.VNode) => snabbdom.VNode[];
