/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@my/eslint-config/next.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
};
