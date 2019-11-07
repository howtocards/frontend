const path = require("path")
const cra = require("../config/webpack.config")("development")

module.exports.managerWebpack = async function managerWebpack(config, options) {
  return {
    ...config,
    resolve: {
      ...config.resolve,
      modules: [path.resolve(__dirname, "..", "src"), "node_modules"],
      alias: {
        ...config.resolve.alias,
        ...cra.resolve.alias,
        // "@api": path.resolve(__dirname, "..", "src", "api"),
        // "@features": path.resolve(__dirname, "..", "src", "features"),
        // "@lib": path.resolve(__dirname, "..", "src", "lib"),
        // "@howtocards/ui": path.resolve(__dirname, "..", "src", "ui"),
      },
    },
  }
}
