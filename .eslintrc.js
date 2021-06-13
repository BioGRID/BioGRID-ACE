module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    indent: 'off',
    'vue/html-indent': 'off',
    camelcase: 'off',
    'no-console': 'off'
  }
}
