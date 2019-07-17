const path = require('path')

module.exports = {
  entry: './plugins/uikit.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}
