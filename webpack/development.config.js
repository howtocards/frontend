const { resolve } = require('path')
const {
  LoaderOptionsPlugin,
  EnvironmentPlugin,
  HotModuleReplacementPlugin,
  NamedModulesPlugin,
} = require('webpack')
const merge = require('webpack-merge')

const { config, DIST } = require('./common')


module.exports = merge(config, {
  profile: true,
  devtool: 'cheap-module-eval-source-map',
  mode: 'development',

  output: {
    filename: '[name].js',
    publicPath: '/',
    path: DIST,
    pathinfo: true,
  },

  performance: {
    hints: false,
  },

  plugins: [
    new LoaderOptionsPlugin({
      debug: true,
      minimize: false,
    }),

    new EnvironmentPlugin({
      NODE_ENV: 'development',
    }),

    new NamedModulesPlugin(),

    new HotModuleReplacementPlugin(),
  ],

  devServer: {
    contentBase: resolve(__dirname, '..', 'public'),
    port: 3001,
    hot: true,
    // noInfo: true,
    // historyApiFallback: true,
    // inline: false,
    // stats: {
    //   colors: true,
    //   chunks: false,
    //   children: false,
    // },
    // watchOptions: {
    //   aggregateTimeout: 300,
    //   poll: true,
    // },
    stats: false,
  },
})

// module.exports.entry = {
//   index: ['react-hot-loader/patch'].concat(config.entry.index),
//   polyfill: ['react-hot-loader/patch'].concat(config.entry.polyfill),
// }
