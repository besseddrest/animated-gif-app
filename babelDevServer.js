// Run the dev server with babel preprocessing so we can use ES6/7
require('babel-core/register')({
  stage: 0
});

// Autoreload styles/json in development
if (process.env.NODE_ENV !== 'production') {
  if (!require('piping')({
      hook: true,
      ignore: /(\/\.|~$|\.json|\.scss$)/i
    })) {
    return;
  }
}

require('./devServer');
