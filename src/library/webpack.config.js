// Dependencies
const path = require('path');
const webpack = require('webpack');

// Directory paths
const projectRoot = path.join(__dirname, '..', '..');
const src = __dirname;
const dest = path.join(projectRoot, 'public', 'assets');

module.exports = {
  context: src,

  entry: {
    library: ['./index.js'],
  },

  output: {
    library: '[name]',
    path: dest,
    filename: '[name].js',
  },

  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: path.join(projectRoot, '.[name]-manifest.json'),
    }),
  ],
};
