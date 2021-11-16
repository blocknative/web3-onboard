const baseConfig = require('../../ava.config.js')

baseConfig.require.push('./tests/setup.ts')

module.exports = {
  ...baseConfig
}
