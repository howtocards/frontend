module.exports = {
  presets: ["react-app"],
  plugins: ["react-hot-loader/babel", "styled-components"],
  env: {
    development: {
      plugins: [
        [
          "styled-components",
          {
            displayName: true,
          },
        ],
      ],
    },
  },
}
