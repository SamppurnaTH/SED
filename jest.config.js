export default {
  testEnvironment: 'node', // Changed from 'jsdom' to 'node' for backend tests
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.next/'
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { 
      presets: [
        '@babel/preset-env', 
        '@babel/preset-react', 
        '@babel/preset-typescript'
      ],
      plugins: [
        '@babel/plugin-transform-modules-commonjs',
        '@babel/plugin-proposal-export-namespace-from',
        '@babel/plugin-proposal-class-properties'
      ]
    }],
  },
  transformIgnorePatterns: [
    'node_modules/(?!(.*\\.mjs|@babel/runtime/helpers/esm/|@babel/runtime/helpers/esm/|@babel/runtime/helpers/asyncToGenerator|@babel/runtime/regenerator))',
  ],
  extensionsToTreatAsEsm: ['.ts', '.tsx', '.jsx'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  testMatch: [
    '**/__tests__/**/*.test.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)'
  ],
  globals: {
    'ts-jest': {
      useESM: true,
      isolatedModules: true,
      tsconfig: 'tsconfig.jest.json'
    },
  },
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironmentOptions: {
    url: 'http://localhost',
  },
  // Add this to handle ES modules in node_modules
  transformIgnorePatterns: [
    'node_modules/(?!(.*\\.mjs|@babel/runtime/helpers/esm/|@babel/runtime/regenerator|@babel/runtime/helpers/asyncToFunction|@babel/runtime/helpers/asyncGenerator))',
  ],
  // Setup test coverage
  collectCoverage: true,
  collectCoverageFrom: [
    'backend/**/*.{js,jsx,ts,tsx}',
    '!backend/node_modules/**',
    '!**/node_modules/**',
    '!**/coverage/**',
    '!**/.next/**',
    '!**/dist/**',
    '!**/build/**',
  ],
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  // Add support for absolute imports
  moduleDirectories: ['node_modules', '<rootDir>'],
  // Add support for TypeScript path aliases
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/pages/(.*)$': '<rootDir>/pages/$1',
    '^@/styles/(.*)$': '<rootDir>/styles/$1',
    '^@/lib/(.*)$': '<rootDir>/lib/$1',
    '^@/hooks/(.*)$': '<rootDir>/hooks/$1',
    '^@/contexts/(.*)$': '<rootDir>/contexts/$1',
    '^@/services/(.*)$': '<rootDir>/services/$1',
    '^@/utils/(.*)$': '<rootDir>/utils/$1',
    '^@/types/(.*)$': '<rootDir>/types/$1',
    '^@/public/(.*)$': '<rootDir>/public/$1',
  },
  // Add support for ES modules
  transform: {
    '^.+\\.(js|jsx|ts|tsx|mjs)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  // Add support for CSS modules
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  // Add support for environment variables
  setupFiles: ['<rootDir>/src/__tests__/setup.js'],
  // Add support for TypeScript
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.jest.json',
    },
  },
};
