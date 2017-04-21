const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineChunkWebpackPlugin = require('html-webpack-inline-chunk-plugin');
const vueConfig = require('./vue-loader.config');

const isProd = process.env.NODE_ENV === 'production';
const hotClient = 'webpack-hot-middleware/client';

module.exports = {
  entry: {
    vendor: [
      'core-js/modules/es6.promise',
      'core-js/modules/es6.object.assign',
      'core-js/modules/es6.array.find',
      'whatwg-fetch',
      'vue',
      'vue-class-component',
      'vue-router',
      'marked',
    ],
    app: (isProd ? [] : [hotClient]).concat(['./src/client/main.ts']),
  },

  output: {
    path: path.resolve('dist/public'),
    publicPath: '/',
    filename: isProd ? 'js/[name].[chunkhash].js' : 'js/[name].js',
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueConfig,
      },
      {
        test: /\.ts$/,
        loader: 'vue-ts-loader',
      },
      Object.assign({
        test: /\.css$/,
      }, isProd ? {
        loader: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              }
            },
            'postcss-loader',
          ],
          fallback: 'style-loader',
        }),
      } : {
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          'postcss-loader',
        ],
      }),
      {
        test: /favicon\.ico$/,
        loader: 'file-loader',
        options: {
          name: 'favicon.ico',
        },
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.ts'],
  },

  devtool: isProd ? 'source-map' : 'cheap-module-eval-source-map',

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.VUE_ENV': '"client"',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
  ].concat(isProd ? [
    new InlineChunkWebpackPlugin({
      inlineChunks: ['manifest'],
    }),
    new ExtractTextPlugin('css/[name].[chunkhash].css'),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      sourceMap: true,
    }),
  ] : [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ]),

  performance: {
    hints: isProd ? 'warning' : false,
  },
};
