/**
 * @file frontend.webpack.dev.config.js
 * @author Panagiotis Tzimos.
 *
 * Development webpack settings.
 */

const merge = require('webpack-merge');
const path = require('path');
const baseConfig = require('./base.config.js');
const dotEnv = require('dotenv-webpack');

const dot_env = new dotEnv({
		path: path.resolve(__dirname, '../env/.env.docker_dev'),

		safe: true,
});

module.exports = merge(baseConfig, {
		devtool: 'eval-source-map',
		devServer: {
				host: '0.0.0.0',
				port: 8000,
				historyApiFallback: true
		},
		plugins: [
				dot_env,
		]
});
