let path = require('path');
let express = require('express');
let webpack = require('webpack');
let config = require('./webpack.config.dev');

let app = express();
let compiler = webpack(config);

let PORT = process.env.PORT || 3020;

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`✅  Listening at http://localhost:${PORT}`);
});
