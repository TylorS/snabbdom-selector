import { VNode } from 'snabbdom/vnode';

export interface Selector {
  (selector: string, vNode: VNode): Array<VNode>;
  (selector: string): (vNode: VNode) => Array<VNode>;
}

export type Select =
  (selector: string, vNode: VNode) => Array<VNode>;
