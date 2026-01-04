module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "google",
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  rules: {
    quotes: ["error", "double"],
    "quote-props": ["error", "as-needed"],
    "comma-dangle": ["error", "always-multiline"],
    "max-len": ["error", { code: 120 }],
    "object-curly-spacing": ["error", "always"],
    "require-jsdoc": "off",
    "new-cap": "off",
    "eol-last": ["error", "always"],
  },
};
