var path = require('path')
var utils = require('./utils')
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

const extractStylus = new ExtractTextPlugin({filename: "[name].css"});

module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  plugins: [extractStylus],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: /(src|test)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              'babel-preset-react', 'babel-preset-es2015'
            ],
            plugins: ['transform-class-properties']
          }
        }
      },
      // {   test: /\.styl$/,   use: ['css-loader', 'stylus-loader'] },
      {
        test: /\.styl$/,
        include: /(src)/,
        use: extractStylus.extract({
          use: ['css-loader', 'stylus-loader']
        })
      }, {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      }, {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      }, {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
