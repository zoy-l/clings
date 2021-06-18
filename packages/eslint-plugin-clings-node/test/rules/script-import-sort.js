/**
 * @author Zoy
 */

const { RuleTester } = require('eslint')
const rule = require('../../lib/rules/script-import-sort')

const tester = new RuleTester({
  parserOptions: { ecmaVersion: 2015, sourceType: 'module' }
})

tester.run('script-import-sort', rule, {
  valid: [
    `
      import foo from 'foo-bar'
      import vue from 'vue'
     `,
    `
      import vue from 'vue'
      import foo from './foo-bar'
     `,
    `
      import path from 'path'
      import vue from 'vue'
      import foo from './foo-bar'
      import react from './vue'
     `
  ],
  invalid: [
    {
      code: `
        import foo from './foo-bar'
        import vue from 'vue'
       `,
      output: `
        import vue from 'vue'
        import foo from './foo-bar'
       `,
      errors: [
        {
          messageId: 'scriptImportSort'
        }
      ]
    },
    {
      code: `
        import foo from './foo-bar'
        import foo2 from './foo-bar2'
        import vue2 from 'vue2'
        import foo1 from './foo-bar1'
        import vue from 'vue'
       `,
      output: `
        import vue2 from 'vue2'
        import vue from 'vue'
        import foo2 from './foo-bar2'
        import foo1 from './foo-bar1'
        import foo from './foo-bar'
       `,
      errors: [
        {
          messageId: 'scriptImportSort'
        }
      ]
    },
    {
      code: `
        import foo from './foo-bar'
        import foo2 from './foo-bar2'
       `,
      output: `
        import foo2 from './foo-bar2'
        import foo from './foo-bar'
       `,
      errors: [
        {
          messageId: 'scriptImportSort'
        }
      ]
    },
    {
      code: `
        import './foo-bar'
        import foo2 from './foo-bar2'
       `,
      output: `
        import foo2 from './foo-bar2'
        import './foo-bar'
       `,
      errors: [
        {
          messageId: 'scriptImportSort'
        }
      ]
    },
    {
      code: `
        import './foo-bar'
        import {
          foo2,
          foo1,
          foo3,
          foo5
        } from './foo-bar2'
       `,
      output: `
        import {
          foo2,
          foo1,
          foo3,
          foo5
        } from './foo-bar2'
        import './foo-bar'
       `,
      errors: [
        {
          messageId: 'scriptImportSort'
        }
      ]
    }
  ]
})
