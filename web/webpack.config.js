const path = require("path");

module.exports = {
    entry: "./src/frontend/components/Index.js",
    output: {
      path: path.resolve(__dirname, "public"),
      publicPath: "/dist/",
      filename: "bundle.js",
      chunkFilename: "[name].bundle.js",
    },
    devServer: {
      contentBase: "./",
      publicPath: "/dist/",
      historyApiFallback: true,
      hot: true,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
          exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: "file-loader",
              options: {},
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx", ".json", ".wasm", ".mjs", "*"],
    },
  };
