/**
 * @typedef {import('eslint').Rule.RuleModule} RuleModule
 */

// const isEqual = require('lodash.isequal')

/** @type {RuleModule} */
module.exports = {
  meta: {
    docs: {
      description: 'script import sort',
      category: 'node',
      recommended: true
    },
    messages: {
      scriptImportSort: 'import sort.\n (导入排序)'
    },
    fixable: 'code'
  },
  create(context) {
    const sourceCode = context.getSourceCode()

    return {
      ImportDeclaration(node) {
        let newBodyImportDeclaration = []
        const bodyImportDeclaration = []

        const programNode = context.getAncestors()[0]

        const level0 = []
        const level1 = []

        programNode.body.forEach((ident) => {
          if (ident.type === 'ImportDeclaration') {
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

        let bodyTokenIndex
        let rightIndex
        bodyImportDeclaration.forEach((nodeToken, index) => {
          if (nodeToken.range[0] === node.range[0]) {
            bodyTokenIndex = index
          }

          if (newBodyImportDeclaration[index].range[0] === node.range[0]) {
            rightIndex = index
          }
        })

        if (bodyTokenIndex !== rightIndex) {
          context.report({
            node,
            messageId: 'scriptImportSort',
            fix(fixer) {
              // bodyImportDeclaration[bodyTokenIndex] = bodyImportDeclaration.splice(
              //   rightIndex,
              //   1,
              //   bodyImportDeclaration[bodyTokenIndex]
              // )[0]

              const applyFixer = [
                fixer.replaceText(
                  bodyImportDeclaration[bodyTokenIndex],
                  sourceCode.getText(newBodyImportDeclaration[rightIndex])
                ),
                fixer.replaceText(
                  bodyImportDeclaration[rightIndex],
                  sourceCode.getText(bodyImportDeclaration[bodyTokenIndex])
                )
              ]

              bodyImportDeclaration.forEach((item, index) => {
                console.log(item.source.value, '---', newBodyImportDeclaration[index].source.value)
              })

              console.log(applyFixer)
              console.log(bodyTokenIndex, rightIndex)
              console.log('--------------------------')
              return applyFixer
            }
          })
        }
      }
    }
  }
}
