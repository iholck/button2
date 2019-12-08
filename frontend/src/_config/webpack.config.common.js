
const HtmlPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const helpers = require('../_helpers/helpers');

const isDev = process.env.NODE_ENV === 'development';

const webpackConfig = {
  entry: {
    polyfill: '@babel/polyfill',
    main: helpers.root('index'),
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      vue$: isDev ? 'vue/dist/vue.runtime.js' : 'vue/dist/vue.runtime.min.js',
      //    'vue$': 'vue/dist/vue.common.js',
      '@': helpers.root('src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        include: [helpers.root('app'), helpers.root('device'), helpers.root('home'), helpers.root('login'), helpers.root('register')],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [helpers.root('src')],
      },
      {
        test: /\.css$/,
        use: [
          isDev ? 'vue-style-loader' : MiniCSSExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: isDev } },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          isDev ? 'vue-style-loader' : MiniCSSExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: isDev } },
          { loader: 'sass-loader', options: { sourceMap: isDev } },
        ],
      },
      {
        test: /\.sass$/,
        use: [
          isDev ? 'vue-style-loader' : MiniCSSExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: isDev } },
          { loader: 'sass-loader', options: { sourceMap: isDev } },
        ],
      },
    ],
  },
  plugins: [
    new HtmlPlugin({ template: helpers.root('index.html'), chunksSortMode: 'dependency' }),
  ],
  externals: {
    // global app config object
    config: JSON.stringify({
      apiUrl: 'https://dockersvr.local:4000',
    }),
  },
};

module.exports = webpackConfig;
