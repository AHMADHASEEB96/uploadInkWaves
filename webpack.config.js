const path = require("path");

module.exports = {
  mode: "development", // 'production' for production or 'none' to disable any default behavior
  entry: "/assets/js/app.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
