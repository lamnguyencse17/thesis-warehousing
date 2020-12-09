const path = require("path");
const webpack = require("webpack");

const envKeys = {
	"process.env.PORT": `'${process.env.PORT}'`,
	"process.env.BACKEND_SERVER": `'${process.env.BACKEND_SERVER}'`,
	"process.env.FRONTEND_SERVER": `'${process.env.FRONTEND_SERVER}'`,
};

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
	plugins: [new webpack.DefinePlugin(envKeys)],
};
