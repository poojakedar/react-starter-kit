module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime', // Disables the 'React must be in scope' rule for React 17+
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', 'node_modules'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  plugins: ['react', 'react-hooks', 'react-refresh'],
  settings: {
    react: { version: 'detect' },
  },
  rules: {
    // Warn on components that are not safe to use with React Fast Refresh
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

    // Enforce consistent prop-types documentation
    'react/prop-types': 'warn',

    // Disallow unused variables but allow variables starting with _
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],

    // Enforce === over == to avoid type coercion bugs
    eqeqeq: ['error', 'always'],

    // Prevent console.log from leaking into production (use console.warn/error for intentional logging)
    'no-console': ['warn', { allow: ['warn', 'error'] }],
  },
}
