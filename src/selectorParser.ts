import { VNode } from 'snabbdom/vnode';

export function selectorParser (node: VNode) {
  if (!node.sel) {
    return {
      tagName: '',
      id: '',
      className: '',
    };
  }
  const { sel } = node;
  const hashIdx = (sel as string).indexOf('#');
  const dotIdx = (sel as string).indexOf('.', hashIdx);
  const hash = hashIdx > 0 ? hashIdx : (sel as string).length;
  const dot = dotIdx > 0 ? dotIdx : (sel as string).length;

  const tagName = hashIdx !== -1 || dotIdx !== -1 ?
    (sel as string).slice(0, Math.min(hash, dot)) :
    sel as string;
  const id = hash < dot ? (sel as string).slice(hash + 1, dot) : void 0;
  const className = dotIdx > 0 ? (sel as string).slice(dot + 1).replace(/\./g, ' ') : void 0;

  return {
    tagName,
    id,
    className,
  };
}
