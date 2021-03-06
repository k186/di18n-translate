var path = require('path');
var webpack = require('webpack');
var version = require('./package.json').version;

module.exports = {
	entry: {
    di18n: './src/index.js'
  },
	output: {
		path: path.resolve(__dirname, 'dist'),
		library: 'CabinXDI18n',
		libraryTarget: 'umd',
		filename: '[name].js'
	},
	module: {
    loaders: [{
				test: /\.js$/,
				loader: 'babel',
				exclude: /node_modules/
			}]
  },
	resolve: {
		extensions: ['', '.js'],
		fallback: [path.join(__dirname, '../node_modules')]
	},
	resolveLoader: {
		root: path.join(__dirname, 'node_modules')
	},
	plugins: [
		new webpack.DefinePlugin({
			__VERSION__: JSON.stringify(version)
		})
	]
};