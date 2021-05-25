module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@components": "./src/components",
            "@commons": "./src/commons",
            "@redux": "./src/redux",
            "@helpers": "./src/helpers",
            "@assets": "./assets",
          },
        },
      ],
    ],
  };
};
