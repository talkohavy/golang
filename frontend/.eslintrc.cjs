module.exports = {
  root: true,
  extends: [
    'prettier',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  plugins: ['prettier', 'react', 'import', '@typescript-eslint', 'sort-exports'],
  parser: '@typescript-eslint/parser',
  settings: {
    react: { version: 'detect' },
    'import/parsers': { '@typescript-eslint/parser': ['.ts', '.tsx'] },
    'import/resolver': {
      typescript: { alwaysTryTypes: true, project: './jsconfig.json' },
    },
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  env: { node: true, browser: true, jest: true, es6: true },
  rules: {
    // NOTE: This is where you can Override default settings coming from the plugins!

    // #########################
    // Rule Set 1: generic rules
    // #########################
    'no-debugger': 'warn',
    'no-unused-vars': 'off',
    'prefer-template': 'error',
    'arrow-body-style': 'error',
    'prefer-arrow-callback': 'off',
    'no-constant-condition': 'off',

    // #######################
    // Rule Set 2: react rules
    // #######################
    'react/prop-types': 'off',
    'react/no-unescaped-entities': 'off',
    'react/jsx-uses-react': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    // 'react/jsx-filename-extension': 'error', // Yells at you if you add(?) an extension.
    // 'react/jsx-uses-vars': 'error', // DO NOT USE if no-unused-vars is marked off!

    // ############################
    // Rule Set 3: typescript rules
    // ############################
    '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: 'React' }],

    // ########################
    // Rule Set 4: import rules
    // ########################
    'import/no-duplicates': 'error',
    'import/no-unresolved': 'error',
    'import/newline-after-import': 'error',
    'import/first': 'error',
    'import/exports-last': 'error',
    'import/extensions': ['error', 'never'],
    'import/order': [
      'error',
      {
        pathGroups: [
          { pattern: 'react', group: 'builtin' },
          { pattern: '@*/**', group: 'internal' },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'never',
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],

    // ##########################
    // Rule Set 5: prettier rules
    // ##########################
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'es5',
        tabWidth: 2,
        semi: true,
        singleQuote: true,
        jsxSingleQuote: true,
        jsxBracketSameLine: false,
        bracketSpacing: true,
        arrowParens: 'always',
        parser: 'typescript',
        endOfLine: 'auto',
        printWidth: 120,
        proseWrap: 'preserve',
        htmlWhitespaceSensitivity: 'css',
        embeddedLanguageFormatting: 'off',
        quoteProps: 'as-needed',
      },
      { parser: 'typescript' },
    ],

    // ##############################
    // Rule Set 6: sort-imports rules
    // ##############################
    'sort-imports': [
      'error',
      {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['all', 'single', 'multiple', 'none'],
        allowSeparatedGroups: false,
      },
    ],

    // ##############################
    // Rule Set 7: sort-exports rules
    // ##############################
    'sort-exports/sort-exports': ['error', { sortDir: 'asc' }],
  },
};
