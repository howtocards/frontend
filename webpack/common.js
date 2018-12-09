process.title = "howtocards:webpack"

const { cpus } = require("os")
const { resolve } = require("path")
const { NoEmitOnErrorsPlugin, EnvironmentPlugin } = require("webpack")
const HappyPack = require("happypack")
// const AssetsPlugin = require('assets-webpack-plugin')
const HtmlPlugin = require("html-webpack-plugin")

const { NODE_ENV } = process.env
const IS_PROD = NODE_ENV === "production"
const IS_DEV = NODE_ENV === "development"
const IS_TEST = NODE_ENV === "test"

const DIST = resolve(__dirname, "..", "dist")
const SRC = resolve(__dirname, "..", "src")

const config = {
  context: SRC,
  target: "web",

  entry: {
    polyfill: [
      // 'core-js/modules/es6.array.fill',
      // 'core-js/modules/es6.array.from',
      // 'core-js/modules/es6.array.iterator',
      // 'core-js/modules/es6.map',
      // 'core-js/modules/es6.math.sign',
      // 'core-js/modules/es6.object.assign',
      // 'core-js/modules/es6.object.keys',
      // 'core-js/modules/es6.promise',
      // 'core-js/modules/es6.set',
      // 'core-js/modules/es6.string.includes',
      // 'core-js/modules/es6.symbol',
      // 'core-js/modules/es7.array.includes',
      // 'core-js/modules/es7.object.entries',
      // 'core-js/modules/es7.object.values',
      "core-js/modules/es7.promise.finally",
      "core-js/modules/es7.promise.try",
      "core-js/modules/es7.set.from",
      // 'core-js/modules/es7.set.of',
      // 'core-js/modules/es7.string.at',
      "whatwg-fetch",
    ],
    index: ["./index"],
  },

  resolve: {
    extensions: [".js"],
    modules: ["node_modules"],
    alias: {
      "@features": resolve(SRC, "features"),
      "@lib": resolve(SRC, "lib"),
      "@ui": resolve(SRC, "ui"),
    },
  },

  output: {
    path: DIST,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["happypack/loader"],
      },
      {
        test: /\.svg$/,
        use: "react-svg-loader",
      },
    ],
  },

  parallelism: 8,

  plugins: [
    new NoEmitOnErrorsPlugin(),
    new HappyPack({
      threads: cpus().length,
      loaders: ["babel-loader"],
    }),
    new EnvironmentPlugin({
      NODE_ENV: process.env.NODE_ENV || "development",
    }),

    new HtmlPlugin({
      title: "HowToCards",
      template: resolve(__dirname, "..", "src", "index.tpl.html"),
    }),
  ],

  stats: "errors-only",
}

module.exports = {
  config,

  IS_DEV,
  IS_PROD,
  IS_TEST,

  DIST,
  SRC,
}
