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
      category: 'react-jsx',
      recommended: true
    },
    messages: {
      attributeErectionSequence: 'Property sorting. (多行属性排序检查)'
    },
    schema: [
      {
        type: 'object',
        properties: {
          longToShort: {
            type: 'boolean'
          }
        },
        additionalProperties: false
      }
    ],
    fixable: 'code'
  },
  create(context) {
    const config = context.options[0] || {}
    const isLongToShort = config.longToShort || false

    return {
      JSXOpeningElement(node) {
        const { start, end } = node.loc
        const sourceCode = context.getSourceCode()

        if (start.line !== end.line && node.attributes.length > 1) {
          const newAttrs = [...node.attributes].sort((a, b) => {
            return isLongToShort
              ? b.range[1] - b.range[0] - (a.range[1] - a.range[0])
              : a.range[1] - a.range[0] - (b.range[1] - b.range[0])
          })

          if (!isEqual(newAttrs, node.attributes)) {
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
                      const value = sourceCode.getText(attr)

                      if (node.attributes[index].loc.start.line === node.name.loc.start.line) {
                        return SPACE + value
                      }

                      return (
                        (index !== 0
                          ? '\n' + ''.padEnd(node.attributes[index].loc.start.column)
                          : SPACE) + value
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
