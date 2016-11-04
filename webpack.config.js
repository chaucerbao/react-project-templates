// Dependencies
const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const dllManifest = require('./.dll-manifest.json')

// Directory paths
const src = path.join(__dirname, 'src')
const dest = path.join(__dirname, 'public')

// Plugins and extensions
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const postcssImport = require('postcss-import')
const postcssMixins = require('postcss-mixins')
const postcssSimpleVars = require('postcss-simple-vars')
const postcssNested = require('postcss-nested')
const autoprefixer = require('autoprefixer')

// Configuration
const webpackConfig = {
  context: src,

  entry: {
    application: 'index.js'
  },

  output: {
    path: path.join(dest, 'assets'),
    publicPath: '/assets/',
    filename: '[name].js',
    chunkFilename: '[chunkhash].js'
  },

  module: {
    preLoaders: [{
      loader: 'standard',
      test: /\.jsx?$/,
      include: src
    }],

    loaders: [{
      loader: 'babel?cacheDirectory',
      test: /\.jsx?$/,
      include: src
    }, {
      loader: ExtractTextPlugin.extract('style?singleton', 'css?minimize&-autoprefixer&modules&localIdentName=[folder]__[local]&importLoaders=1!postcss'),
      test: /\.css$/
    }]
  },

  postcss (webpackObject) {
    return [
      postcssImport({
        addDependencyTo: webpackObject,
        path: path.join(src, 'application')
      }),
      postcssMixins,
      postcssSimpleVars,
      postcssNested,
      autoprefixer({
        remove: false
      })
    ]
  },

  plugins: [
    new webpack.DllReferencePlugin({
      context: path.join(src, 'dll'),
      manifest: dllManifest
    }),
    new StyleLintPlugin({
      context: src,
      files: '**/*.css'
    }),
    new ExtractTextPlugin('[name].css')
  ],

  resolve: {
    root: path.resolve(src),
    extensions: ['', '.js', '.jsx']
  },

  devServer: {
    contentBase: dest,
    historyApiFallback: true,
    noInfo: true
  }
}

// Configuration for testing
if (process.env.NODE_ENV === 'test') {
  Object.assign(webpackConfig, {
    target: 'node',
    externals: [nodeExternals()]
  })
}

module.exports = webpackConfig
