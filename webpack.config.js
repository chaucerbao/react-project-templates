// Dependencies
const path = require('path');
const webpack = require('webpack');
const libraryManifest = require('./.library-manifest.json');

// Directory paths
const src = path.join(__dirname, 'src');
const dest = path.join(__dirname, 'public');
const assets = path.join(dest, 'assets');

// Plugins and extensions
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const postcssImport = require('postcss-import');
const postcssMixins = require('postcss-mixins');
const postcssSimpleVars = require('postcss-simple-vars');
const postcssNested = require('postcss-nested');
const autoprefixer = require('autoprefixer');

module.exports = {
  context: src,

  entry: {
    application: 'index.js',
  },

  output: {
    path: assets,
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
      loader: 'babel?cacheDirectory',
      test: /\.jsx?$/,
      include: src,
    }, {
      loader: ExtractTextPlugin.extract('style?singleton', 'css?minimize&-autoprefixer&modules&localIdentName=[folder]__[local]&importLoaders=1!postcss'),
      test: /\.css$/,
    }],
  },

  postcss(webpackObject) {
    return [
      postcssImport({
        addDependencyTo: webpackObject,
        path: path.join(src, 'application'),
      }),
      postcssMixins,
      postcssSimpleVars,
      postcssNested,
      autoprefixer({
        remove: false,
      }),
    ];
  },

  plugins: [
    new webpack.DllReferencePlugin({
      context: assets,
      manifest: libraryManifest,
    }),
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
