module.exports = {
  roots: ['<rootDir>/src'],
  testMatch: ['**/?(*.)+(spec|test).+(ts|tsx|js)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@api/(.*)$': '<rootDir>/src/$1',
    '^@app/(.*)$': '<rootDir>/src/$1',
  },
}
