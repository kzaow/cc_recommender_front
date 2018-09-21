// var nodeExternals = require('webpack-node-externals');
var path = require('path');

module.exports = {
  entry: './js/results_page.jsx',
  output: {
    filename: 'webpack_results_page.js',
    path: path.resolve(__dirname, 'js')
  },
  module: {
   rules: [
     {test: /\.(js|jsx)$/, exclude: /node_modules/, use: 'babel-loader'}
   ]
  }
};

// target: 'node', // in order to ignore built-in modules like path, fs, etc.
// externals: [nodeExternals()] // in order to ignore all modules in node_modules folder
// "build": "watchify js/results_page.jsx -o js/browserify_results.js -t [ babelify --presets [ react es2015] ]"
