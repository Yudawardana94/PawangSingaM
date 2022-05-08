module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      "module:react-native-dotenv", 
      {
        "moduleName": "@env",
        "path": ".env",
        "blacklist": null, // DEPRECATED
        "whitelist": null, // DEPRECATED
        "safe": false,
        "allowUndefined": true,
      }
    ]
  ]
};
