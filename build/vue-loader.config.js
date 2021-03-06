const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { plugins } = require('../postcss.config');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  postcss: plugins,
  loaders: Object.assign({
    js:  'vue-ts-loader',
  }, isProd ? {
    css: ExtractTextPlugin.extract({
      use: ['css-loader'],
      fallback: 'vue-style-loader',
    }),
  } : {}),
  esModule: true,
};
