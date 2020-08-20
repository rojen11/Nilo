const path = require("path");

const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env) => {
  const isProd = env === "production";

  const plugins = [
    new HtmlWebpackPlugin({
      template: "index.html",
      minify: {
        removeComments: true,
        minifyCSS: true,
        inlinesource: ".(js|ts)$",
        collapseWhitespace: true,
        removeTagWhitespace: true,
        removeAttributeQuotes: true,
      },
    }),
  ];

  return {
    mode: isProd ? "production" : "development",
    devtool: "eval-source-map",
    entry: "./src/index.ts",
    plugins,
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: "ts-loader",
          include: [path.resolve(__dirname, "src")],
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [".js", ".ts"],
    },
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "./dist"),
    },
    optimization: {
      minimizer: [new TerserPlugin()],
    },
  };
};
