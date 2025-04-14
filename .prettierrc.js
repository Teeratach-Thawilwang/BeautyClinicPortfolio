module.exports = {
  importOrder: [
    "react-native-gesture-handler",
    "<THIRD_PARTY_MODULES>",
    "^(react|redux)/(.*)$",
    "^styled(.*)$",
    "^@(assets|components|context-providers|enums|hooks|models|navigation|screens|services|src|store|styles|utils)/(.*)$",
    "^[./]"
  ],
  plugins: [require.resolve("@trivago/prettier-plugin-sort-imports")],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  arrowParens: 'avoid',
  bracketSameLine: true,
  bracketSpacing: false,
  singleQuote: true,
  trailingComma: 'all',
  semi: false,
  jsxSingleQuote: true,
  jsxBracketSameLine: true,
  printWidth: 80,
};
