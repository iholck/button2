/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');
const helpers = require('../_helpers/helpers');

const isDev = !(process.env.NODE_ENV || 'development' === 'production');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  output: {
    path: helpers.root('dist'),
    publicPath: '/',
    filename: 'js/[name].bundle.js',
    chunkFilename: 'js/[id].chunk.js',
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
    },
  },
  entry: {
    polyfill: '@babel/polyfill',
    main: helpers.root('index'),
  },
  resolve: {
    extensions: ['.js', '.vue', '.css'],
    alias: {
      vue$: isDev ? 'vue/dist/vue.runtime.js' : 'vue/dist/vue.runtime.min.js',
      '@': helpers.root('src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.vue?$/,
        include: [helpers.root('src')],
        use: 'vue-loader',
      },
      {
        test: /\.js?$/,
        include: [helpers.root('src')],
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        include: [helpers.root('src')],
        use: [
          isDev ? 'vue-style-loader' : MiniCSSExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: isDev } },
        ],
      },
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin(environment),
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: '@/index.html',
    }),
    new VueLoaderPlugin(),
  ],
  devServer: {
    compress: true,
    historyApiFallback: true,
    hot: true,
    open: true,
    overlay: true,
    port: 8080,
    stats: {
      normal: true,
    },
  },
  externals: {
    // global app config object
    config: JSON.stringify({
      apiUrl: 'https://dockersvr.local:4000',
    }),
  },
};
