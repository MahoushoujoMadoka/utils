import antfu from '@antfu/eslint-config'

// {
//   "extends": ["@antfu"],
//   "rules": {
//     "@typescript-eslint/consistent-type-assertions": "off",
//     "@typescript-eslint/ban-ts-comment": "off",
//     "antfu/if-newline": "off",
//     "@stylistic/ts/brace-style": ["off", "1tbs"],
//     "curly": ["error", "all"],
//     "arrow-parens": ["error", "always"],
//     "@stylistic/ts/indent": "off"
//   }
// }
export default antfu({
  // Enable stylistic formatting rules
  // stylistic: true,

  // Or customize the stylistic rules
  stylistic: {
    indent: 2, // 4, or 'tab'
    quotes: 'single', // or 'double'
  },
  // Disable jsonc and yaml support
  jsonc: false,
  yaml: false,

  // `.eslintignore` is no longer supported in Flat config, use `ignores` instead
  ignores: [
    '**/fixtures',
    // ...globs
  ],
}, {
  rules: {
    'no-console': 'error',
    'ts/consistent-type-assertions': 'off',
    'ts/ban-ts-comment': [
      'error',
      {
        minimumDescriptionLength: 3,
        'ts-check': false,
        'ts-expect-error': false,
        'ts-ignore': false,
        'ts-nocheck': false,
      },
    ],
    'node/prefer-global/buffer': ['error', 'always'],
    'style/quote-props': ['error', 'as-needed'],
    'style/brace-style': ['error', '1tbs'],
    curly: ['error', 'all'],
    'style/arrow-parens': ['error', 'always'],
  },
})
