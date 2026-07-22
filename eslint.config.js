// @ts-check
import eslintConfigPrettier from 'eslint-config-prettier'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(eslintConfigPrettier, {
  rules: {
    // Single-word component names are fine for this project (Eyebrow, etc.).
    'vue/multi-word-component-names': 'off',
    // Vue 3 fragments are first-class; layouts/pages here intentionally
    // render sibling sections without a wrapping div.
    'vue/no-multiple-template-root': 'off',
  },
})
