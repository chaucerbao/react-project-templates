// Dependencies
const path = require('path')
const webpack = require('webpack')

// Directory paths
const projectRoot = path.join(__dirname, '..', '..')
const src = __dirname
const dest = path.join(projectRoot, 'public', 'assets')

module.exports = {
  context: src,

  entry: {
    dll: ['./index.js']
  },

  output: {
    library: '[name]',
    path: dest,
    filename: '[name].js'
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.DllPlugin({
      name: '[name]',
      path: path.join(projectRoot, '.[name]-manifest.json')
    })
  ]
}
