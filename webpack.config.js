const webpack = require("webpack");
const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = env => {

  let config = {
    entry: {
        content_scripts: path.join(__dirname, "src/content_scripts.ts"),
        background: path.join(__dirname, "src/background.ts"),
      },
    output: {
        path: path.join(__dirname, "/build/js"),
        filename: "[name].js",
    },
    module: {
      loaders: [{
        exclude: /node_modules/,
        test: /\.tsx?$/,
        loader: "ts-loader",
      } ],
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
    },
    plugins: [
      // pack common vender files
    //   new webpack.optimize.CommonsChunkPlugin({
    //     name: 'vendor',
    //     minChunks: Infinity
    //   })
    ],
  };

  if (env === "production") {
    config.plugins = [
      ...config.plugins,
      // minify
      new UglifyJsPlugin({
        uglifyOptions: {
          ie8: false,
          ecma: 6,
        },
      })
      , new webpack.DefinePlugin({ NODE_ENV: JSON.stringify("production") }),
    ];
  } else {
    config.devtool = "source-map";
  }
  return config;
};
