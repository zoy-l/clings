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
      return <div src='./assets/logo.png' ariaDescribedat='' alt='React logo' height />
    }`,
    `
    function test() {
      return
      <div ariaDescribedat='' alt='React logo' src='./assets/logo.png' height />
    }
    `,
    `
    function test() {
      return
      <div ariaDescribedat='' alt='React logo' src={a}
        height
      />
    }
    `
  ],
  invalid: [
    {
      code: `
      function test() {
        return
        <div
          ariaDescribedat=''
          alt='React logo'
          height
          src='./assets/logo.png'
        />
      }
      `,
      output: `
      function test() {
        return
        <div
          src='./assets/logo.png'
          ariaDescribedat=''
          alt='React logo'
          height
        />
      }
      `,
      errors: [
        {
          messageId: 'attributeErectionSequence'
        }
      ]
    },
    {
      code: `
      function test() {
        return
        <div ariaDescribedat=''
          alt='React logo'
          height
          src='./assets/logo.png'
        />
      }
      `,
      output: `
      function test() {
        return
        <div src='./assets/logo.png'
          ariaDescribedat=''
          alt='React logo'
          height
        />
      }
      `,
      errors: [
        {
          messageId: 'attributeErectionSequence'
        }
      ]
    },
    {
      code: `
      function test() {
        return
        <div ariaDescribedat='' alt='React logo'
          height
          src='./assets/logo.png'
        />
      }
      `,
      output: `
      function test() {
        return
        <div src='./assets/logo.png' ariaDescribedat=''
          alt='React logo'
          height
        />
      }
      `,
      errors: [
        {
          messageId: 'attributeErectionSequence'
        }
      ]
    },
    {
      code: `
      function test() {
        return
        <div ariaDescribedat='' alt='React logo' src='./assets/logo.png'
          height
        />
      }
      `,
      output: `
      function test() {
        return
        <div src='./assets/logo.png' ariaDescribedat='' alt='React logo'
          height
        />
      }
      `,
      errors: [
        {
          messageId: 'attributeErectionSequence'
        }
      ]
    },
    {
      code: `
      function test() {
        const a = '123'
        return
        <div
          ariaDescribedat=''
          alt='React logo'
          height
          src={a}
        />
      }
      `,
      output: `
      function test() {
        const a = '123'
        return
        <div
          ariaDescribedat=''
          alt='React logo'
          src={a}
          height
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
