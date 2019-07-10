const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = {
	out: path.resolve(__dirname, 'out'),
	src: path.resolve(__dirname, 'src')
}

module.exports = (env, options) => {
	return {
		resolve: {
			extensions: ['.ts']
		},
		entry: {
			main: path.join(paths.src, 'ts/main.ts'),
			echo: path.join(paths.src, 'ts/cmds/echo.ts'),
			hello: path.join(paths.src, 'ts/cmds/hello.ts')
		},

		output: {
			path: paths.out,
			publicPath: "./",
			// filename: options.mode == 'development' ? "[name].js" : "[hash].js"
		},
		module: {
			rules: [
				{
					test: /\.sass$/,
					use: [
						{
							loader: "file-loader",
							options: {
								name: options.mode == 'development' ? "[name].css" : "[hash].css"
							}
						},
						// {
						// 	loader: '@americanexpress/purgecss-loader',
						// 	options: {
						// 		paths: [path.join(paths.public, '/*.js'), path.join(paths.templates, '/*')]
						// 	}
						// },
						// "postcss-loader",
						"sass-loader", // compiles Sass to CSS, using Node Sass by default
					]
				},
				{
					test: /\.pug$/,
					use: [
						{
							loader: "pug-loader",
							options: {
								pretty: options.mode == 'development'
							}
						}
					]
				},
				{
					test: /\.ts$/,
					use: [
						"ts-loader"
					]
				},
				{
					test: /\.(png|jpe?g|gif|svg|ico|webmanifest|xml)$/,
					use: [
						{
							loader: 'file-loader',
							options: {
								name: options.mode == 'development' ? "[name].[ext]" : "[hash].[ext]"
							}
						},
					],
				},
			]
		},
		"plugins": [
			new HtmlWebpackPlugin({
				filename: "index.html",
				template: 'src/pug/main.pug',
				inject: false
			}),
		]
	};
};
