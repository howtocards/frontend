module.exports = {
  typescript: false,
  debug: process.env.NODE_ENV !== "production",
  modifyBabelRc: (babelrc) => ({
    ...babelrc,
    babelrc: true,
    presets: [],
    plugins: [],
  }),
}
