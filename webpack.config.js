const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    app: [
      './src/ts/app'
    ]
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js'
  },

  devtool: 'source-map',

  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.jsx']
  },

  module: {
    rules: [{
            test: /\.less$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "less-loader" // compiles Less to CSS
            }]
        }, {
      test: /\.stache$/,
      use: {
        loader: 'can-stache-loader'
      }
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ]
    }, {
      test: /\.stache$/,
      use: [
        'html-loader'
      ]
    }, {
      test: /\.tsx?$/,
      loader: 'awesome-typescript-loader'
    }, {
      test: /\.js$/,
      loader: 'source-map-loader',
      enforce: 'pre'
    }, {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        use: ['css-loader', 'sass-loader']
      })
    }, {
      test: /\.(ico|jpg|jpeg|gif|png|woff|woff2|eot|ttf|svg)$/i,
      use: 'file-loader?name=assets/[name].[ext]'
    }]
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: 'src/index.html'
    }),
    new ExtractTextPlugin('bundle.css'),
    new CopyWebpackPlugin([{
      from: 'src/config',
      to: 'config'
    }])
  ],

  devServer: {
    contentBase: __dirname + '/dist',
    historyApiFallback: true,
    hot: true,
    inline: true,
    port: 8000
  }
};
