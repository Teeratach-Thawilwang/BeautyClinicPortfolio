module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    "node_modules/(?!react-native" +
    "|@react-native" +
    "|@react-navigation" +
    "|@react-native-community" +
    "|react-redux" +
    "|react-native-gesture-handler" +
    "|react-native-reanimated" +
    "|react-native-screens" +
    ")",
  ],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  collectCoverage: true,
  coverageReporters: ["json", "lcov", "text", "clover"],
  collectCoverageFrom: [
    "src/components/**/*",
    "src/hooks/*",
    "src/screens/*",
    "src/utils/*",
    "!src/**/__mock__/**",
    "!src/**/__test__/**",
    "!src/utils/helpers.ts"
  ],
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: './jest/report',
        filename: 'component-test-report.html',
      },
    ],
  ],
};
