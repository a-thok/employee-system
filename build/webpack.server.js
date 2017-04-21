const webpack = require('webpack');
const path = require('path');
const { dependencies, devDependencies } = require('../package.json');

module.exports = {
  target: 'node',

  entry: './src/server/main.ts',

  output: {
    path: path.resolve('dist'),
    filename: 'server.js',
    libraryTarget: 'commonjs2',
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'vue-ts-loader',
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.ts'],
  },

  externals: Object.keys(dependencies).concat(Object.keys(devDependencies)),

  devtool: false,

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.VUE_ENV': '"server"',
    }),
  ],
};
