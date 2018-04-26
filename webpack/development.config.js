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

  performance: false,

  plugins: [
    new LoaderOptionsPlugin({
      // debug: true,
      minimize: false,
    }),

    new EnvironmentPlugin({
      NODE_ENV: 'development',
    }),

    new NamedModulesPlugin(),
    new HotModuleReplacementPlugin(),
  ],

  stats: false,

  devServer: {
    contentBase: resolve(__dirname, '..', 'public'),
    port: 3001,
    hot: true,
    stats: 'minimal',
  },
})
