module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['module:react-native-dotenv'],
    [
      'transform-imports',
      {
        'react-native-vector-icons': {
          transform: (importName) => `react-native-vector-icons/dist/${importName}`,
          preventFullImport: true,
        },
      },
    ],
    [
      "module-resolver",
      {
        root: ["./"],
        alias: {
          "@assets": "./src/assets",
          "@components": "./src/components",
          "@context-providers": "./src/context-providers",
          "@enums": "./src/enums",
          "@hooks": "./src/hooks",
          "@models": "./src/models",
          "@navigation": "./src/navigation",
          "@repositories": "./src/repositories",
          "@screens": "./src/screens",
          "@services": "./src/services",
          "@store": "./src/store",
          "@styles": "./src/styles",
          "@utils": "./src/utils"
        }
      }
    ],
    ["react-native-reanimated/plugin"],
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
