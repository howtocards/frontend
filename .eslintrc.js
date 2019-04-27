module.exports = {
  extends: ["plugin:jest/recommended", "react-app", "@atomix/react"],
  parser: "babel-eslint",
  globals: {
    grecaptcha: true,
  },
  rules: {
    "no-use-before-define": [
      "error",
      {
        functions: false,
        classes: true,
        variables: false,
      },
    ],
    quotes: "off",
    "react/sort-comp": "off",
  },
}
