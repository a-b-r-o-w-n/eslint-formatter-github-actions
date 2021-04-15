module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:prettier/recommended",
  ],
  env: {
    es6: true,
    node: true,
  },
  rules: {
    "@typescript-eslint/explicit-module-boundary-types": "off",
  },
};
