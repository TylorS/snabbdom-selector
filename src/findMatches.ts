import * as snabbdom from 'snabbdom';
import { selectorParser } from './selectorParser';

export function findMatches (cssSelector: string, vNode: snabbdom.VNode): Array<snabbdom.VNode> {
  console.log(cssSelector);
  const { tagName, id, className } = selectorParser(vNode);
  console.log(tagName, id, className);
  return [];
}
