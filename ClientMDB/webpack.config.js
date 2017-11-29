const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
// const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
//   template: './client/index.html',
//   filename: 'index.html',
//   inject: 'body'
// })

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSass = new ExtractTextPlugin({
  filename: "[name].css",
  disable: process.env.NODE_ENV === "development"
})

module.exports = {
  entry: {
    registration: './client/registration.js',
    login: './client/login',
    signup: './client/signup'
  },
  output: {
    path: path.resolve('dist'),
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /.scss$/,
        use: extractSass.extract({
          use: [{
            loader: "css-loader"
          }, {
            loader: "sass-loader"
          }],
          fallback: "style-loader"
        })
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin ({
      title: 'Registration Form',
      template: './client/index.html',
      chunks: ['registration'],
      filename: 'registration.html'
    }),
    new HtmlWebpackPlugin({
      title: 'Login',
      template: './client/index.html',
      chunks: ['login'],
      filename: 'login.html'
    }),
    new HtmlWebpackPlugin({
      title: 'Sign Up',
      template: './client/index.html',
      chunks: ['signup'],
      filename: 'signup.html'
    }),
    extractSass
  ]
}