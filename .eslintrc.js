module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: "airbnb-base",
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  rules: {
    quotes: "off",
    "comma-dangle": "off",
    "no-console": "off",
    "implicit-arrow-linebreak": "off",
    "spaced-comment": "off",
    "no-empty": "off"
  }
};
