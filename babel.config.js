module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      "module-resolver",
      {
        "alias": {
          "@redux": "./src/redux",
          "@hooks": "./src/hooks",
          "@utils": "./src/utils",
          "@models": "./src/models",
          "@themes": "./src/themes",
          "@screens": "./src/screens",
          "@slice": "./src/redux/slice",
          "@services": "./src/services",
          "@contants": "./src/contants",
          "@images": "./src/assets/images",
          "@reuse": "./src/components/reuse",
          "@lotties": "./src/assets/lotties",
          "@selector": "./src/redux/selector",
          "@navigations": "./src/navigations",
          "@commom": "./src/components/commom",
          "@asyncThunk": "./src/redux/asyncThunk",
        }
      }
    ]
  ]
};
