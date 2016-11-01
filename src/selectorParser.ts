import * as snabbdom from 'snabbdom';

export function selectorParser ({ sel }: snabbdom.VNode) {
  const hashIdx = sel.indexOf('#');
  const dotIdx = sel.indexOf('.', hashIdx);
  const hash = hashIdx > 0 ? hashIdx : sel.length;
  const dot = dotIdx > 0 ? dotIdx : sel.length;

  const tagName = hashIdx !== -1 || dotIdx !== -1 ? sel.slice(0, Math.min(hash, dot)) : sel;
  const id = hash < dot ? sel.slice(hash + 1, dot) : void 0;
  const className = dotIdx > 0 ? sel.slice(dot + 1).replace(/\./g, ' ') : void 0;

  return {
    tagName,
    id,
    className,
  };
}
