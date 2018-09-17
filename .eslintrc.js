module.exports = {
  globals: {
    React: true,
    ReactDOM: true,
    SpriteReact: true,
  },
  extends:  "eslint-config-sprite",
  plugins: ['html'],
  rules: {
    "complexity": ["warn", 25],
    "import/no-mutable-exports": 'off',
  },
}
