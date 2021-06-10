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
      <div height src={a} alt='React logo'
        ariaDescribedat=''
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
          height
          alt='React logo'
          ariaDescribedat=''
          src='./assets/logo.png'
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
        <div height
          alt='React logo'
          ariaDescribedat=''
          src='./assets/logo.png'
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
        <div height alt='React logo'
          ariaDescribedat=''
          src='./assets/logo.png'
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
        <div height alt='React logo' ariaDescribedat=''
          src='./assets/logo.png'
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
          alt='React logo'
          height
          src={a}
          ariaDescribedat={()=>{
            console.log(123);
          }}
        />
      }
      `,
      output: `
      function test() {
        const a = '123'
        return
        <div
          height
          src={a}
          alt='React logo'
          ariaDescribedat={()=>{
            console.log(123);
          }}
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
      options: [{ longToShort: true }],
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
      options: [{ longToShort: true }],
      code: `
      function test() {
        return
        <div ariaDescribedat=''
          src='./assets/logo.png'
          alt='React logo'
          height
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
      options: [{ longToShort: true }],
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
      options: [{ longToShort: true }],
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
      options: [{ longToShort: true }],
      code: `
      function test() {
        const a = '123'
        return
        <div
          alt='React logo'
          height
          src={a}
          ariaDescribedat={()=>{
            console.log(123);
          }}
        />
      }
      `,
      output: `
      function test() {
        const a = '123'
        return
        <div
          ariaDescribedat={()=>{
            console.log(123);
          }}
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
    },

    {
      code: `
      function test() {
        const props = {}
        return
        <div
          onFocus={() => {}}
          onBlur={() => {}}
          onInput={() => {}}
          placeholder={'placeholder'}
          size="large"
          {...props}
        />
      }
      `,
      output: `
      function test() {
        const props = {}
        return
        <div
          {...props}
          size="large"
          onBlur={() => {}}
          onFocus={() => {}}
          onInput={() => {}}
          placeholder={'placeholder'}
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
