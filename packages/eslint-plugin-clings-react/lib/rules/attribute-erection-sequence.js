/**
 * @typedef {import('eslint').Rule.RuleModule} RuleModule
 */

const { isEqual } = require('../utils')

/** @type {RuleModule} */
module.exports = {
  meta: {
    docs: {
      description: 'attribute erection sequence',
      category: 'vue-template',
      recommended: true
    },
    schema: [],
    messages: {
      attributeErectionSequence:
        'Property lengths are arranged from long to short.\n (多行属性, 长度从长到短排列.)'
    }
  },
  create(context) {
    return {
      JSXOpeningElement(node) {
        const { start, end } = node.loc

        if (start.line !== end.line && node.attributes.length > 1) {
          const length = []
          for (let i = node.attributes.length - 1; i >= 0; i--) {
            const { loc } = node.attributes[i]
            length.unshift(loc.end.column - loc.start.column)
          }
          const newLength = [...length].sort((a, b) => b - a)

          if (!isEqual(newLength, length)) {
            context.report({
              node,
              messageId: 'attributeErectionSequence'
              // fix(fixer) {
              //   fixer.insertTextAfter
              // }
            })
          }
        }
      }
    }
  }
}
