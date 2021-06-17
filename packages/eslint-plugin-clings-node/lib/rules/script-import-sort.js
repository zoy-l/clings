/**
 * @typedef {import('eslint').Rule.RuleModule} RuleModule
 */

const isEqual = require('lodash.isequal')

/** @type {RuleModule} */
module.exports = {
  meta: {
    docs: {
      description: 'script import sort',
      category: 'node',
      recommended: true
    },
    messages: {
      scriptImportSort: 'import sort. (导入排序)'
    },
    fixable: 'code'
  },
  create(context) {
    const sourceCode = context.getSourceCode()

    return {
      Program(node) {
        const level0 = []
        const level1 = []

        let newBodyImportDeclaration = []
        const bodyImportDeclaration = []

        node.body.forEach((ident) => {
          if (ident.type === 'ImportDeclaration' && typeof ident.source.value === 'string') {
            if (ident.source.value.charAt(0) === '.') {
              level1.push(ident)
            } else {
              level0.push(ident)
            }
            bodyImportDeclaration.push(ident)
          }
        })

        level0.sort((a, b) => b.range[1] - b.range[0] - (a.range[1] - a.range[0]))
        level1.sort((a, b) => b.range[1] - b.range[0] - (a.range[1] - a.range[0]))

        newBodyImportDeclaration = [...level0, ...level1]

        if (!isEqual(bodyImportDeclaration, newBodyImportDeclaration)) {
          context.report({
            loc: {
              start: bodyImportDeclaration[0].loc.start,
              end: bodyImportDeclaration[bodyImportDeclaration.length - 1].loc.end
            },
            messageId: 'scriptImportSort',
            fix(fixer) {
              return bodyImportDeclaration.map((token, index) => {
                return fixer.replaceText(token, sourceCode.getText(newBodyImportDeclaration[index]))
              })
            }
          })
        }
      }
    }
  }
}
