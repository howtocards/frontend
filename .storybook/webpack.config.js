const path = require("path")
const fs = require("fs")
const paths = require("../config/paths")
// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

const cra = require("../config/webpack.config")("development")

module.exports = async ({ config }) => ({
  ...config,
  resolve: {
    ...config.resolve,
    extensions: [".js", ".mjs", ".json"],
    modules: [path.resolve(__dirname, "..", "src"), "node_modules"],
    mainFields: ["main", "module"],

    alias: {
      ...config.resolve.alias,
      ...cra.resolve.alias,
    },
  },
})
