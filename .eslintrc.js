module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  parser: 'vue-eslint-parser',
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended',
    './.eslintrc-auto-import.json',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: '2020',
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
    jsxPragma: 'React',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'vue/no-v-model-argument': 'off',
    // 'indent': ['error', 2],
    'semi': [2, 'never'], // 结尾分号
    'quotes': [2, 'single', 'avoid-escape'],
    '@typescript-eslint/no-this-alias': 'error',
    '@typescript-eslint/ban-types': [
      'error',
      {
        // 关闭空类型检查 {}
        extendDefaults: true,
        types: {
          '{}': false
        }
      }
    ],
  },
  globals: {
    DialogOption: 'readonly',
    OptionType: 'readonly'
  }
}
