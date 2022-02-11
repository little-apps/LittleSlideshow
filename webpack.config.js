const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
	mode: devMode ? 'development' : 'production',
	entry: {
		'littleslideshow': './index.js'
	},
	output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].min.js",
        publicPath: "/dist"
    },
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
					"css-loader", // translates CSS into CommonJS
					"sass-loader" // compiles Sass to CSS, using Node Sass by default
				]
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "[name].min.css",
			chunkFilename: "[id].css"
		})
	]
};