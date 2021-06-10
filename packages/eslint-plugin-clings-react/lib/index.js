module.exports = {
  rules: {
    'attribute-erection-sequence': require('./rules/attribute-erection-sequence.js')
  },
  configs: {
    recommended: require('./config/recommended'),
    'recommended-r': require('./config/recommended-r')
  }
}
