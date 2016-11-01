import { curry2 } from './curry2';
import { findMatches } from './findMatches';
import { Selector, Select } from './types';

export { Selector, Select };

export const select: Selector = curry2(findMatches);

export { selectorParser } from './selectorParser';
export { classNameFromVNode } from './classNameFromVNode';
