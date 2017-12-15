const webpack = require('webpack');
const path = require('path');
const PATH = require('./build_path');
const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const stylelint = require('stylelint');
const stylelintRules = require('../../../stylelint.config.js');
const styleVariables = require(path.join(PATH.SOURCE_PATH, 'css/variables'));

var config = (module.exports = {
  context: PATH.ROOT_PATH,
  entry: {
    // base: PATH.ROOT_PATH + 'app/frontend/js/base.js',
    index: PATH.ROOT_PATH + 'app/frontend/js/index.js'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js?$/,
        exclude: /node_modules/,
        use: [{ loader: 'eslint-loader', options: { emitWarning: true } }]
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
            options: { presets: ['es2015', 'react', 'stage-2'] }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)\??.*$/,
        use: 'url-loader?limit=8192&name=font/[name].[ext]'
      },
      {
        test: /\.(jpe?g|png|gif|svg)\??.*$/,
        use: 'url-loader?limit=8192&name=img/[name].[ext]'
      },
      {
        test: /\.css$/,
        include: [/node_modules/],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: function(webpack) {
                  return [
                    require('postcss-import')({
                      addDependencyTo: webpack
                    }),
                    require('postcss-cssnext')({
                      autoprefixer: {
                        browsers: 'ie >= 9, ...'
                      },
                      features: {
                        customProperties: {
                          variables: styleVariables
                        }
                      }
                    })
                  ];
                }
              }
            }
          ]
        })
      },
      {
        test: /\.css$/,
        exclude: [/node_modules/],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: '[name]__[local]___[hash:base64:5]'
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: function(webpack) {
                  return [
                    require('lost'),
                    require('postcss-import')({
                      addDependencyTo: webpack
                    }),
                    // require('stylelint')({
                    //   config: stylelintRules,
                    //   failOnError: true
                    // }),
                    require('postcss-cssnext')({
                      autoprefixer: {
                        browsers: 'ie >= 9, ...'
                      },
                      features: {
                        customProperties: {
                          variables: styleVariables
                        }
                      }
                    })
                  ];
                }
              }
            }
          ]
        })
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      STYLES: path.join(PATH.SOURCE_PATH, '/css'),
      COMMON: path.join(PATH.SOURCE_PATH, 'js/common'),
      API: path.join(PATH.SOURCE_PATH, 'js/api'),
      APP: path.join(PATH.SOURCE_PATH, 'js/app'),
      CONSTS: path.join(PATH.SOURCE_PATH, 'js/consts/index.js'),
      COMPONENTS: path.join(PATH.SOURCE_PATH, 'js/app/components'),
      PAGES: path.join(PATH.SOURCE_PATH, 'js/app/pages'),
      ACTIONS: path.join(PATH.SOURCE_PATH, 'js/actions'),
      STORE: path.join(PATH.SOURCE_PATH, 'js/store'),
      REDUCERS: path.join(PATH.SOURCE_PATH, 'js/reducers')
    }
  },
  output: {
    path: PATH.ASSET_PATH,
    filename: 'js/[name].js'
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: 'React',
      react: 'React',
      'window.react': 'React',
      'window.React': 'React',
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new webpack.DllReferencePlugin({
      context: PATH.ROOT_PATH,
      manifest: require(path.join(PATH.ASSET_PATH, './vendors-manifest.json'))
    }),
    new ManifestPlugin({
      fileName: 'rev-manifest.json'
    }),
    new CopyWebpackPlugin([
      {
        from: PATH.ROOT_PATH + 'app/frontend/vendor/',
        to: PATH.ROOT_PATH + 'public/assets/vendor/'
      },
      {
        from: PATH.ROOT_PATH + 'app/frontend/site/',
        to: PATH.ROOT_PATH + 'public/assets/site/'
      },
      {
        from: PATH.ROOT_PATH + 'app/frontend/img/edwardxiao.jpg',
        to: PATH.ROOT_PATH + 'public/assets/img/edwardxiao.jpg'
      }
    ])
  ]
});
