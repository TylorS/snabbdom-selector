import { VNode } from 'snabbdom/vnode';

export interface Selector {
  (selector: string, vNode: VNode | undefined): Array<VNode>;
  (selector: string): (vNode: VNode | undefined) => Array<VNode>;
}

export type Select =
  (selector: string, vNode: VNode | undefined) => Array<VNode>;
