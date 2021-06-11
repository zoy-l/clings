module.exports = {
  plugins: ['@clings/react'],
  rules: {
    '@clings/react/attribute-erection-sequence': ['error', { longToShort: true }]
  }
}
