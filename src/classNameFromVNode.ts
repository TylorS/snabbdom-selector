import snabbdom = require('snabbdom');
import { selectorParser  } from './selectorParser';

export function classNameFromVNode(vNode: snabbdom.VNode): string {
  let { className: cn } = selectorParser(vNode);

  if (!vNode.data) {
    return cn;
  }

  const {class: dataClass, props} = vNode.data;

  if (dataClass) {
    const c = Object.keys(dataClass)
      .filter(cl => dataClass[cl]);

    cn += ` ${c.join(` `)}`;
  }

  if (props && props.className) {
    cn += ` ${props.className}`;
  }

  return cn.trim();
}
