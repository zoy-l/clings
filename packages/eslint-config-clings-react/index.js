const prettier = require('prettier')

const typescript = require('./typescript')
const react = require('./react')
const base = require('./base')

module.exports = {
  configs: {
    typescript,
    react,
    base
  },
  prettier
}
