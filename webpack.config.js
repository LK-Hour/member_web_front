module.exports = {
  // ...other configurations,
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.(js|jsx|ts|tsx)$/,
        loader: "source-map-loader",
        exclude: /node_modules\/react-datepicker/,
      },
      // ...other rules
    ],
  },
  ignoreWarnings: [
    {
      module: /react-datepicker/,
    },
  ],
  // ...other configurations
}; 