import { VNode } from 'snabbdom/vnode';
import { selectorParser } from './selectorParser';

export function classNameFromVNode(vNode: VNode): string {
  let { className: cn = '' } = selectorParser(vNode);

  if (!vNode.data) {
    return cn;
  }

  const {class: dataClass, props} = vNode.data;

  if (dataClass) {
    const c = Object.keys(dataClass)
      .filter((cl: string) => dataClass[cl]);

    cn += ` ${c.join(` `)}`;
  }

  if (props && props.className) {
    cn += ` ${props.className}`;
  }

  return cn && cn.trim();
}
