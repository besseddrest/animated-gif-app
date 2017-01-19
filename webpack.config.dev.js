var path = require('path');
var webpack = require('webpack');
var common = require('./webpack.config.common');
var objectAssign = require('object-assign');

module.exports = objectAssign({}, common, {
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client'
  ].concat(common.entry),
  plugins: common.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ])
});
