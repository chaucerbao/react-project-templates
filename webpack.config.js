// Dependencies
const path = require('path')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// Configuration
module.exports = (_env, _argv) => {
  // Paths
  const baseDir = process.cwd()
  const src = path.resolve(baseDir, 'src')
  const dest = path.resolve(baseDir, 'public')

  return {
    context: baseDir,
    entry: {
      script: path.join(src, 'index.tsx')
    },
    output: {
      path: dest,
      filename: path.join('js', '[name].js'),
      chunkFilename: path.join('js', '[chunkhash].js')
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          include: src,
          use: [
            { loader: 'cache-loader' },
            {
              loader: 'thread-loader',
              options: { workers: require('os').cpus().length - 1 }
            },
            { loader: 'ts-loader', options: { happyPackMode: true } }
          ]
        }
      ]
    },
    plugins: [
      new ForkTsCheckerWebpackPlugin({
        checkSyntacticErrors: true,
        watch: src
      }),
      new HtmlWebpackPlugin({
        title: 'React Project Templates',
        template: path.join(__dirname, 'template.html'),
        hash: true,
        minify: {
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true
        }
      })
    ],
    resolve: {
      extensions: ['.js', '.ts', '.tsx']
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
      historyApiFallback: true,
      stats: 'minimal'
    }
  }
}
