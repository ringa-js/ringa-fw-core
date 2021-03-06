const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const ROOT_PATH = path.resolve(process.env.PWD);

module.exports = {
  name: 'ringa-fw-core',
  devtool: 'cheap-module-eval-source-map',
  entry: {
    app: path.resolve(ROOT_PATH, 'harness/index.js')
  },
  output: {
    path: path.join(ROOT_PATH, 'dist'),
    filename: '[name].[hash].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      react: path.resolve(__dirname, '../node_modules/react'),
      'react-dom': path.resolve(__dirname, '../node_modules/react-dom'),
      'moment': path.resolve(__dirname, '../node_modules/moment'),
      'trie-search': path.resolve(__dirname, '../node_modules/trie-search'),
      'ringa': path.resolve(__dirname, '../node_modules/ringa'),
      'react-ringa': path.resolve(__dirname, '../node_modules/react-ringa')
    }
  },
  devServer: {
    contentBase: path.resolve(ROOT_PATH, 'dist'),
    historyApiFallback: true,
    hot: true,
    inline: true,
    host: "0.0.0.0",
    port: 8080,
    disableHostCheck: true
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'stage-0', 'react'],
            compact: false
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'Ringa FW Core',
      template: path.resolve(ROOT_PATH, 'harness/templates/index.ejs'),
      filename: 'index.html',
      inject: false,
      cache: true
    })
  ]
};
