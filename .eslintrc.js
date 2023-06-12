module.exports = {
  root: true
, parser: '@typescript-eslint/parser'
, plugins: ['@typescript-eslint']
, extends: [
    'eslint:recommended'
  , 'plugin:@typescript-eslint/recommended'
  , 'plugin:react/recommended'
  , 'plugin:react/jsx-runtime'
  , 'plugin:react-hooks/recommended'
  ]
, rules: {
    '@typescript-eslint/no-inferrable-types': 'off'
  , '@typescript-eslint/ban-ts-comment': 'off'
  }
, settings: {
    react: {
      'version': 'detect'
    }
  }
}
