module.exports = {
  multipass: true,
  plugins: [
    {
      name: "preset-default",
      params: {
        overrides: {
          removeViewBox: false,
          removeTitle: false,
        },
      },
    },
    {
      name: "removeDimensions",
    },
    {
      name: "prefixIds",
    },
    {
      name: "removeUselessDefs",
    },
    {
      name: "cleanupNumericValues",
      params: {
        floatPrecision: 2,
      },
    },
  ],
};
