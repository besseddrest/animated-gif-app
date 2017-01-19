var path = require('path');
var webpack = require('webpack');
var pkg = require('./package.json');

module.exports = {
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'], // see .babelrc for config
        include: path.join(__dirname, 'src')
      },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.s?css$/, loader: 'style!css?importLoaders=2&sourceMap!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap' },
      { test: /\.(png|svg|jpg|jpeg)$/, loader: 'url-loader?limit=10240' }
    ]
  },
  resolve: {
    alias: {
      // Alias react to our copy of react to prevent loading two copies of react
      // when react is specified as an upstream peer-dependency
      react: path.join(__dirname, 'node_modules', 'react'),
      "react-dom": path.join(__dirname, 'node_modules', 'react-dom')
    },
    modulesDirectories: ['node_modules'],
    extensions: ['', '.json', '.js', '.jsx', '.css', '.scss', '.png', '.svg', '.jpg', '.jpeg']
  },
};
