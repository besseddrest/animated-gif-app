var path = require('path');
var webpack = require('webpack');
var common = require('./webpack.config.common');
var objectAssign = require('object-assign');

module.exports = objectAssign({}, common, {
  devtool: 'source-map',
  plugins: common.plugins.concat([
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ])
});
