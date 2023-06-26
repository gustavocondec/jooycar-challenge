module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true,
  },
  extends: ["standard-with-typescript", "plugin:prettier/recommended"],
  ignorePatterns: ["node_modules"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "tsconfig.json",
  },
  rules: {
    "@typescript-eslint/naming-convention": 0,
    "@typescript-eslint/strict-boolean-expressions": 0,
    "@typescript-eslint/no-misused-promises": 0,
    "@typescript-eslint/no-extraneous-class": 0,
  },
};
