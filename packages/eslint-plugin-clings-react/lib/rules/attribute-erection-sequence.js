/**
 * @typedef {import('eslint').Rule.RuleModule} RuleModule
 */

const isEqual = require('lodash.isequal')

const SPACE = ' '

/** @type {RuleModule} */
module.exports = {
  meta: {
    docs: {
      description: 'attribute erection sequence',
      category: 'vue-template',
      recommended: true
    },
    messages: {
      attributeErectionSequence:
        'Property lengths are arranged from long to short.\n (多行属性, 长度从长到短排列.)'
    },
    fixable: 'code'
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
            const newAttrs = [...node.attributes].sort((a, b) => {
              a.loc.end.column - a.loc.start.column
              return b.loc.end.column - b.loc.start.column - (a.loc.end.column - a.loc.start.column)
            })

            context.report({
              node,
              messageId: 'attributeErectionSequence',
              fix(fixer) {
                return fixer.replaceTextRange(
                  [
                    node.attributes[0].range[0] - 1,
                    node.attributes[node.attributes.length - 1].range[1]
                  ],
                  newAttrs
                    .map((attr, index) => {
                      const value = attr.value
                        ? `${attr.name.name}=${
                            attr.value.value || attr.value.value === ''
                              ? `'${attr.value.value}'`
                              : `{${attr.value.expression ? attr.value.expression.name : ''}}`
                          }`
                        : attr.name.name

                      if (node.attributes[index].loc.start.line === node.name.loc.start.line) {
                        return SPACE + value
                      }

                      return (
                        (index !== 0
                          ? '\n' + ''.padEnd(node.attributes[index].loc.start.column)
                          : SPACE) + (attr.value ? value : attr.name.name)
                      )
                    })
                    .join('')
                )
              }
            })
          }
        }
      }
    }
  }
}
