module.exports = {
  '**/*.{js,ts,json}': (/** @type {string[]} */ filenames) => `bun eslint --fix ${filenames.join(' --fix ')}`,
  '**/*.{js,ts,json}': (/** @type {string[]} */ filenames) =>
    `bun prettier --check ${filenames.join(' --check ')} --write ${filenames.join(' --write ')}`,
};
