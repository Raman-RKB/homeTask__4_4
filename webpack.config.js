/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

// eslint-disable-next-line prettier/prettier
const mode = process.env.NODE_ENV === "production" ? "production" : "development";

module.exports = {
  entry: "./src/script.ts",
  mode,
  module: {
    rules: [
      {
        test: [/\.css$/, /\.ts$/],
        use: [MiniCssExtractPlugin.loader, "css-loader", 'ts-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  optimization: {
    minimizer: [
      '...',
      new CssMinimizerPlugin(),
    ],
  },
  devtool:
    process.env.NODE_ENV === "production" ? false : "source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  plugins: [
    new MiniCssExtractPlugin(), 
    new HtmlWebpackPlugin({
    filename: 'index.html',
    template: './index.html',
  })],
};