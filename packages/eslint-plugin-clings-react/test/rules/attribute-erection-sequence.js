/**
 * @author Zoy
 */

const { RuleTester } = require('eslint')
const rule = require('../../lib/rules/attribute-erection-sequence')

const tester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2015,
    ecmaFeatures: {
      jsx: true
    }
  }
})

tester.run('attribute-erection-sequence', rule, {
  valid: [
    `
    function test() {
      return <div src="./assets/logo.png" ariaDescribedat="" alt="React logo" height />
    }`
  ],
  invalid: [
    {
      code: `
      function test() {
        return
        <div
          ariaDescribedat=""
          alt="React logo"
          height
          src="./assets/logo.png"
        />
      }
        `,
      errors: [
        {
          messageId: 'attributeErectionSequence'
        }
      ]
    }
  ]
})
