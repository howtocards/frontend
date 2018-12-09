/* eslint-disable import/no-default-export */

module.exports = {
  presets: [
    [
      "@babel/env",
      {
        modules: false,
        useBuiltIns: "usage",
      },
    ],
    "@babel/react",
  ],
  plugins: [
    ["@babel/plugin-proposal-class-properties", { loose: false }],
    "@babel/proposal-export-namespace-from",
    "@babel/syntax-dynamic-import",
    "@babel/plugin-proposal-json-strings",
  ],
  env: {
    production: {
      plugins: [
        "@babel/transform-react-constant-elements",
        "@babel/transform-react-inline-elements",
        [
          "transform-react-remove-prop-types",
          {
            removeImport: true,
          },
        ],
      ],
    },
    development: {
      plugins: [
        // 'react-hot-loader/babel',
        "styled-name",
      ],
    },
    test: {
      presets: [["@babel/env"], "@babel/react"],
    },
  },
}
