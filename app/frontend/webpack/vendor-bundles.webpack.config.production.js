var webpack = require('webpack');
var ManifestPlugin = require('webpack-manifest-plugin');

var config = module.exports = require('./vendor-bundles.webpack.config.js');

config.plugins.push(
  new ManifestPlugin({
    fileName: 'manifest_vendor.json'
  }),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false
  })
);

config.output['filename'] = '[name]_bundle_[chunkhash].js';
