import cssauron from 'cssauron'
import parseSelector from './parseSelector'
import getClasses from './getClasses'

const language = cssauron({
  tag(node) {
    return parseSelector(node.sel).tagName
  },
  class(node) {
    return getClasses(node)
  },
  id(node) {
    if (node.data && node.data.props && node.data.props.id) {
      return node.data.props.id
    }
    return parseSelector(node.sel).id
  },
  children(node) {
    return node.children || []
  },
  parent(node) {
    return node.parent || node
  },
  contents(node) {
    return node.text
  },
  attr(node, attr) {
    if (node.data) {
      const {attrs = {}, props = {}} = node.data
      if (attrs[attr]) {
        return attrs[attr]
      }
      if (props[attr]) {
        return props[attr]
      }
    }
  },
})

export default language
