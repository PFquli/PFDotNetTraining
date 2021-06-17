module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb-typescript-prettier'],
  plugins: ['prettier'],
  globals: {
    $: true,
    document: true,
    window: true,
    fetch: true,
  },
  ignorePatterns: ['/dist/js/**.js', 'webpack.config.js'],
  rules: {
      'prettier/prettier': ['error'],
      "import/prefer-default-export": "off",
    'linebreak-style': [
      'error',
      process.platform === 'win32' ? 'windows' : 'unix',
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
};
