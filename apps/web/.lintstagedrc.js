module.exports = {
  "**/*.{js,ts,tsx,json}": (/** @type {string[]} */ filenames) =>
    `bun eslint --fix ${filenames.join(" --fix ")}`,
  "**/*.{js,ts,tsx,json}": (/** @type {string[]} */ filenames) =>
    `bun prettier --check ${filenames.join(
      " --check "
    )} --write ${filenames.join(" --write ")}`,
  "**/*.{css,scss}": (/** @type {string[]} */ filenames) =>
    `bun stylelint --fix ${filenames.join(" --fix ")}`,
};
