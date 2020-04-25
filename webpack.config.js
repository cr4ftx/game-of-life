const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');

const mode = process.env.NODE_ENV || 'production';

module.exports = {
  entry: './src/main.js',

  mode,

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },

  resolve: {
    extensions: ['.js']
  },

  output: {
    filename: 'app.[hash].js',
    path: path.resolve(__dirname, 'dist')
  },

  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: 'public/index.html'
    })
  ],

  devServer: {
    contentBase: './dist'
  }
};
