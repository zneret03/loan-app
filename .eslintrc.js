module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'airbnb-typescript',
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:eslint-comments/recommended',
    'plugin:jest/recommended',
    'plugin:react/recommended',
    'plugin:promise/recommended',
    'plugin:unicorn/recommended',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module',
    project: ['./tsconfig.json']
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: ['./tsconfig.json']
      }
    }, // All index.tsx should always go for default export. Useful for Nextjs routing in the future
    {
      files: ['**/*/index.tsx', 'pages/**/*.tsx', 'pages/**/*.ts'],
      rules: {
        'import/no-default-export': 'off',
        'import/prefer-default-export': 'error',
        // ? NextJS stuff tends to rely more on spread props.
        // ? But for our usage, we kinda discourage it because we want the codebase to be as declarative as possible
        'react/jsx-props-no-spreading': 'off'
      }
    },
    {
      files: ['**/*.test.tsx?'],
      extends: ['plugin:testing-library/react', 'plugin:jest-dom/recommended']
    },
    {
      // ? Apparently, all index.tsx files are already ignored
      files: [
        'app/*/*.tsx',
        'app/*.tsx',
        '**/context/**/*.{ts,tsx}',
        '**/layouts/**/*.{ts,tsx}',
        '**/not-found/**/*.{ts,tsx}'
      ],
      rules: {
        'import/no-default-export': 'off',
        'unicorn/filename-case': [
          'error',
          {
            cases: {
              pascalCase: false
            }
          }
        ]
      }
    },
    {
      files: [
        '*.test.{ts,tsx}',
        'constants.{ts,tsx}',
        'helpers.{ts,tsx}',
        '**/constants/*.{ts,tsx}',
        '**/helpers/*.{ts,tsx}',
        '**/helpers/**'
      ],
      rules: {
        'unicorn/filename-case': 'off'
      }
    }
  ],
  plugins: ['react', '@typescript-eslint', 'testing-library', 'jest-dom'],
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx']
  },
  rules: {
    'no-console': ['error', { allow: ['error', 'info'] }],
    // Too restrictive, writing ugly code to defend against a very unlikely scenario: https://eslint.org/docs/rules/no-prototype-builtins
    'no-prototype-builtins': 'off',
    // https://basarat.gitbooks.io/typescript/docs/tips/defaultIsBad.html
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',
    // Too restrictive: https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/destructuring-assignment.md
    'react/destructuring-assignment': 'off',
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        required: {
          some: ['nesting', 'id']
        }
      }
    ],
    'jsx-a11y/label-has-for': [
      'error',
      {
        required: {
          some: ['nesting', 'id']
        }
      }
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true
      }
    ],
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/explicit-function-return-type': [
      'warn',
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true
      }
    ],
    'react/prop-types': 0,
    'react/prefer-stateless-function': 2,
    // very unlikely you'll stumble with the radix issue, unless you're trying to be clever with parseInt
    radix: 0,
    // we don't need to return or catch promises for our usage
    // see more here: https://gist.github.com/mwickett/2aecfdeea40daa07d39e11922ae1fe20#gistcomment-2153642
    'promise/always-return': 0,
    'promise/catch-or-return': 0,
    'unicorn/prevent-abbreviations': 0,
    'import/no-cycle': 0, // This option acts weird when using resolvers,
    'unicorn/no-array-reduce': 0,
    'jsx-a11y/control-has-associated-label': 0, // Sometimes, we just wanted a button on its own
    // We don't need to add react declaration in NextJS project
    'react/react-in-jsx-scope': 'off',
    // Kinda unnecessary for our usage
    'unicorn/no-null': 'off',
    // React Hook Form needs spreading.
    'react/jsx-props-no-spreading': 'off',
    // This is unneccessary, as we don't use propTypes anymore
    'react/require-default-props': 'off',
    'react/prop-types': 'off',
    'react/no-unused-prop-types': 'off',
    'arrow-body-style': ['error', 'as-needed'],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_'
      }
    ]
  },
  ignorePatterns: ['coverage', '__mocks__']
}
