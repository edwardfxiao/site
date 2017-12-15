const base = require('./base.js');
const _ = require('lodash');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ENV = require('../../../.env');

const config = _.merge(base, {
  devtool: 'cheap-source-map',
  output: {
    // publicPath: '/' + ENV.APP_NAME + '/assets/',
    publicPath: '/assets/',
    filename: '[name]-[chunkhash].js'
  },
});

config.plugins.push(
  new webpack.optimize.CommonsChunkPlugin({
    name: 'common',
    filename: 'common-[hash].js',
  }),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false
  }),
  new ExtractTextPlugin({ filename: 'css/[name]-[hash].css', disable: false, allChunks: true })
);

module.exports = config;
