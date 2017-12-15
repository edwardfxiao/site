const webpack = require('webpack')
const path = require('path');
const PATH = require('./build_path');
const ManifestPlugin = require('webpack-manifest-plugin');

const reacts = [
  'babel-polyfill',
  'react',
  'react-dom',
  'react-addons-update',
  'react-redux',
  'react-router-dom',
  'redux',
  'redux-thunk',
];

module.exports = {
  entry: {
    // create two library bundles, one with jQuery and
    // another with React and related libraries
    "vendors": reacts
  },

  output: {
    filename: '[name].js',
    path: PATH.ASSET_PATH,
    publicPath: PATH.SERVER_PATH,

    // The name of the global variable which the library's
    // require() function will be assigned to
    library: '[name]_lib',
  },

  plugins: [
    new webpack.DllPlugin({
      // The path to the manifest file which maps between
      // modules included in a bundle and the internal IDs
      // within that bundle
      path: path.join(PATH.ASSET_PATH, './[name]-manifest.json'),
      // The name of the global variable which the library's
      // require function has been assigned to. This must match the
      // output.library option above
      name: '[name]_lib',
      context: PATH.ROOT_PATH
    })
  ]
}