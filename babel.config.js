module.exports = {
  presets: ["react-app"],
  plugins: [
    "react-hot-loader/babel",
    "styled-components",
    "@babel/proposal-optional-chaining",
  ],
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
