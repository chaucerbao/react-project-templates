// Dependencies
const path = require('path');
const webpack = require('webpack');

// Directory paths
const src = path.join(__dirname, 'src');
const dest = path.join(__dirname, 'public');

// Plugins and extensions
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const postcssImport = require('postcss-import');
const postcssMixins = require('postcss-mixins');
const postcssSimpleVars = require('postcss-simple-vars');
const postcssNested = require('postcss-nested');

module.exports = {
  context: src,

  entry: {
    application: 'index.js',
  },

  output: {
    path: path.join(dest, 'assets'),
    publicPath: '/assets/',
    filename: '[name].js',
    chunkFilename: '[chunkhash].js',
  },

  module: {
    preLoaders: [{
      loader: 'eslint',
      test: /\.jsx?$/,
      include: src,
    }],

    loaders: [{
      loader: 'babel',
      query: {
        presets: ['es2015', 'react'],
      },
      test: /\.jsx?$/,
      include: src,
    }, {
      loader: ExtractTextPlugin.extract('style', 'css?sourceMap&minimize!postcss'),
      test: /\.css$/,
    }],
  },

  postcss(webpackObject) {
    return [
      postcssImport({
        addDependencyTo: webpackObject,
        path: path.join(src, 'application', 'style'),
      }),
      postcssMixins,
      postcssSimpleVars,
      postcssNested,
    ];
  },

  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
    }),
    new StyleLintPlugin({
      files: '**/*.css',
    }),
    new ExtractTextPlugin('[name].css'),
  ],

  resolve: {
    root: path.resolve(src),
    extensions: ['', '.js', '.jsx', '.css'],
  },

  devServer: {
    contentBase: dest,
    historyApiFallback: true,
    noInfo: true,
  },
};
