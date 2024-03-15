/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

module.exports = {
  outputDir: path.resolve(__dirname, "../server/public"),
  devServer: {
    proxy: {
      "/": {
        target: "http://localhost:4000",
      },
    },
  },
};
