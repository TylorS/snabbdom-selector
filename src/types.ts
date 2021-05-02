import { VNode } from 'snabbdom';

export interface Selector {
  (selector: string, vNode: VNode | undefined): Array<VNode>;
  (selector: string): (vNode: VNode | undefined) => Array<VNode>;
}

export type Select =
  (selector: string, vNode: VNode | undefined) => Array<VNode>;
