const path = require('path')
const { DefinePlugin } = require('webpack')

const prefix = './src'
const aliases = {
  '@': `${prefix}`,
  '@components': `${prefix}/components`,
}

const resolvedAliases = Object.fromEntries(
  Object.entries(aliases).map(([key, value]) => [key, path.resolve(__dirname, value)]),
)

module.exports = {
  webpack: {
    alias: resolvedAliases,
    plugins: [
      new DefinePlugin({
        APP_VERSION: JSON.stringify(require('./package.json').version),
        BUILD_DATE: JSON.stringify(new Date().toString()),
      }),
    ],
  },
}
