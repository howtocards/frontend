const os = require('os')
const {
  LoaderOptionsPlugin,
  EnvironmentPlugin,
  optimize: {
    ModuleConcatenationPlugin,
  },
} = require('webpack')
const merge = require('webpack-merge')
const UglifyPlugin = require('uglifyjs-webpack-plugin')

const { config } = require('./common')


module.exports = merge(config, {
  mode: 'production',
  devtool: 'source-map',

  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: 'chunk-[name].[cchunkhash].js',
    crossOriginLoading: 'anonymous',
  },

  plugins: [
    new LoaderOptionsPlugin({
      debug: false,
      minimize: true,
    }),

    new EnvironmentPlugin({
      NODE_ENV: 'production',
    }),

    new ModuleConcatenationPlugin(),

    new UglifyPlugin({
      parallel: os.cpus().length,
      sourceMap: true,
      uglifyOptions: {
        output: { comments: false },
      },
    }),
  ],
})
