module.exports = {
  parser: "babel-eslint",
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: ["eslint:recommended"],
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
    sourceType: "module",
  },
  plugins: ["import"],
  rules: {
    "linebreak-style": ["error", "unix"],
    semi: ["error", "always"],
    "no-console": [
      "warn",
      { allow: ["clear", "info", "error", "dir", "trace"] },
    ],
    curly: "error",
    "import/named": 2,
    "no-else-return": "error",
    "no-unneeded-ternary": "error",
    "no-unused-vars": "warn",
    "no-useless-return": "error",
    "no-var": "error",
    "one-var": ["error", "never"],
    "prefer-arrow-callback": "error",
    strict: "error",
    "symbol-description": "error",
    yoda: ["error", "never", { exceptRange: true }],
  },
};