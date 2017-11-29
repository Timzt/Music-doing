var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  devtool: "source-map",
  entry: {
    app: './src/main.js'
    // vendor:['vue1','axios1']
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    // filename:'static/js/[name].[chunkhash].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath,
      chunkFilename:"chunks/[name]-[chunkhash:8].js"//生成chunk文件的格式
  },
  resolve: {
    extensions: ['.js', '.vue', '.json','.styl'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        include: [  
        /src/,//表示在src目录下的css需要编译  
        '/node_modules/element-ui/lib/'   //增加此项  
        ],  
        test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader' 
      }
    ]
  }
}
