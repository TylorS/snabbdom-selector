# Snabbdom Selector [![ComVer](https://img.shields.io/badge/ComVer-compliant-brightgreen.svg)](https://github.com/staltz/comver)

`snabbdom-selector` is a utility tool, written in TypeScript,
to find snabbdom VNode objects matching a given CSS Selector.

## This is for me!
```sh
npm install snabbdom-selector
```

## Basic Usage
```js
import { select } from 'snabbdom-selector'
import * as h from 'snabbdom/h'

const vNode = h('div', {}, [
  h('div.test', {}, [
    h('p', {key: 1}, 'Foo')
  ])
])

const matches = select('.test p', vNode)

console.log(matches)
// => [{sel: 'p', text: 'Foo', elm: HTMLElement, key: 1, children: undefined, data: {...}}]
```

## API

### `select(cssSelector: string, vNode: snabbdom.VNode): Array<snabbdom.VNode>`
### `select(cssSelector: string): (vNode: snabbdom.VNode) => Array<snabbdom.VNode>`

Note that there are 2 function signatures, this is because `select` is curried!

This is the main function provided by this library, it allows using a css selector to
find vNode's that are made from that css selector. The vNode used will be traversed, and
any matches at any arbitrary depth will be returned inside of the resulting array. An empty
array will be returned if no matches are found.

```js
import { select } from 'snabbdom-selector'

const vNode = h('div', {}, [
  h('div.test', {}, [
    h('p', {key: 1}, 'Foo')
  ])
])

const match = select('.test p'); // if given 1 parameter it returns a new function!
const matches = match(vNode);

console.log(matches)
// => [{sel: 'p', text: 'Foo', elm: HTMLElement, key: 1, children: undefined, data: {...}}]
```

### `selectorParser(selector: string): Object`

This function given a CSS selector like that passed to snabbdom's `h` function, returns an object
containing parsed tagName, id, and className.

```js
import { selectorParser } from 'snabbdom-selector'

const { tagName, id, className } = selectorParser('div#foo.bar.baz');

console.log(tagName) // div
console.log(id) // foo
console.log(className) // 'bar baz'
```

### `classNameFromVNode(vNode: snabbdom.VNode): string`

This function given a snabbdom VNode object will return its className including that contained
within snabbdom's provided `props` and `class` modules.

```js
import { classNameFromVNode } from 'snabbdom-selector'

const vNode = h('div.foo', { class: { bar: true } }, [])

console.log(classNameFromVNode(vNode)) // 'foo bar'
```

## Versioning
This library uses [compatible versioning](https://github.com/staltz/comver), a versioning system
that is backwards compatible with semantic-versioning.
