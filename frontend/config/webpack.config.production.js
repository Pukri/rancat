const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const config = require('./webpack.config.base');

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production'),
  'process.env.ENDPOINT': JSON.stringify(process.env.ENDPOINT || 'http://0.0.0.0:3001'),
};

module.exports = merge(config, {
  devtool: 'source-map',
  entry: {
    main: ['babel-polyfill', path.join(__dirname, '../src/client.jsx')],
  },
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(['build/*'], { root: path.resolve(__dirname, '..') }),
    new CopyWebpackPlugin([{ from: path.join(__dirname, '../src/public/images'), to: 'images' }]),
    new webpack.DefinePlugin(GLOBALS),
  ],
  module: {
    rules: [],
  },
  optimization: {
    noEmitOnErrors: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          cache: true,
          compress: {
            drop_console: true,
          },
        },
      }),
    ],
  },
});
