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
const dotEnv = require('dotenv-webpack');


// Extract imported CSS into own file
const extraText = new ExtractTextPlugin('[name].bundle.[chunkhash].css');

// Minify CSS
const loader_options = new webpack.LoaderOptionsPlugin({
		minimize: true,
});


const dot_env = new dotEnv({
		path: path.resolve(__dirname, '../env/.env.docker_prod'),
		safe: true,

});


module.exports = merge(baseConfig, {
		output: {
				path: path.resolve(__dirname, '../build'),
				filename: '[name].bundle.[chunkhash].js',
		},

		module: {
				rules: [
						{
								test: /\.css$/,
								use: ExtractTextPlugin.extract({
										use: [
												'css-loader',
										],
								}),
						},
						{
								test: /\.css$/,
								use: [
										'style-loader',
										'css-loader?importLoaders=1',
								],
						},
				],
		},
		plugins: [
				extraText,
				loader_options,
				dot_env
		],
});
