module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./"],
        alias: {
          "@assets": "./src/assets",
          "@components": "./src/components",
          "@contexts": "./src/contexts",
          "@enums": "./src/enums",
          "@hooks": "./src/hooks",
          "@types": "./src/types",
          "@navigation": "./src/navigation",
          "@repositories": "./src/repositories",
          "@store": "./src/store",
          "@screens": "./src/screens",
          "@services": "./src/services",
          "@utils": "./src/utils"
        }
      }
    ]
  ]
};
