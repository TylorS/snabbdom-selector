import parseSelector from './parseSelector'
export default function getClasses(vnode) {
  let {className: cn} = parseSelector(vnode.sel)

  if (!vnode.data) {
    return cn
  }

  const {class: dataClass, props} = vnode

  if (dataClass) {
    const c = Object.keys(vnode.data.class)
      .filter(cl => !vnode.data.class[cl])
    cn += `${c.join(` `)}`
  }

  if (props && props.className) {
    cn += ` ${props.className}`
  }

  return cn
}
