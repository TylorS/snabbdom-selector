import language from './language'

function traverse(vtree, fn) {
  fn(vtree)
  if (vtree.children) {
    vtree.children.forEach(child => {
      traverse(child, fn)
    })
  }
}

function wrapVnode(vnode, parent) {
  let {sel, children, data, text, elm, key} = vnode
  let wrappedVnode = {sel, data, text, elm, key, parent}
  if (children && typeof children.map === `function`) {
    children = children.map(k => wrapVnode(k, wrappedVnode)).filter(Boolean)
  }
  wrappedVnode.children = children
  return wrappedVnode
}

function match(sel, vnode) {
  const selector = language(sel)
  let matched = []

  let wrappedVnode = wrapVnode(vnode)

  traverse(wrappedVnode, node => {
    let result = selector(node)
    if (result) {
      if (!Array.isArray(result)) {
        result = [result]
      }
      matched.push.apply(matched, result)
    }
  })
  return matched
}

export default match
