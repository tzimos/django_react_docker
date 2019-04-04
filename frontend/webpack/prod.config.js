/**
 * @file frontend.webpack.dev.config.js
 * @author Panagiotis Tzimos.
 *
 * Production webpack settings.
 */

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const baseConfig = require('./base.config.js');

// Extract imported CSS into own file
const extraText = new ExtractTextPlugin('[name].bundle.[chunkhash].css');

// Minify CSS
const loader_options = new webpack.LoaderOptionsPlugin({
		minimize: true,
});


const env_vars = new webpack.EnvironmentPlugin(['API_HOST', 'DEBUG']);


module.exports = merge(baseConfig, {
		output: {
				path: path.resolve(__dirname, '../build'),
				filename: '[name].bundle.[chunkhash].js',
		},
		plugins: [
				extraText,
				loader_options,
				env_vars
		],
});
