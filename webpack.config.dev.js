//webpack开发配置文件
const path = require('path');
module.exports = {
  entry: [
    'react-hot-loader/patch',
    path.join(__dirname, "src/index.js")
  ],
  output: {
    path: path.join(__dirname, "dist/"),
    filename: "bundle.js",
  },
  mode: "development",
  //webpack-dev-server
  devServer: {
    contentBase: path.join(__dirname, './dist'),
    port:4000,
    host:"127.0.0.1",
    historyApiFallback: true,
    proxy: {
      "/api": "http://localhost:3000"
    }
  },
  //module-name-alias-setting
  resolve: {
    alias : {
      pages: path.join(__dirname, 'src/pages'),
      component: path.join(__dirname, 'src/component'),
      router: path.join(__dirname, 'src/router'),
      store: path.join(__dirname, 'src/store'),
      actions: path.join(__dirname, 'src/redux/actions'),
      reducers: path.join(__dirname, 'src/redux/reducers'),
    }
  },
  module: {
    rules: [
      {
         /*src文件夹下面的以.js结尾的文件，要使用babel解析*/
         /*cacheDirectory是用来缓存编译结果，下次编译加速*/
        test: /\.js?$/,
        use: ['babel-loader?cacheDirectory=true'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.(css|less)$/,
        use: [{
            loader: "style-loader" // creates style nodes from JS strings
        }, {
            loader: "css-loader" // translates CSS into CommonJS
        }, {
            loader: "less-loader" // compiles Less to CSS
        }]
      },
      {
        test: /\.(png|jpg|gif|ttf|TTF)$/,
        use: [
          {
            loader: 'url-loader'
          }
        ]
      }, 
      {
        test: /\.(mp3|ogg)$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      },   
      {
        test: /\.svg$/,
        use: [
          {
            loader: "babel-loader"
          },
          {
            loader: "react-svg-loader",
            options: {
              jsx: true // true outputs JSX tags
            }
          }
        ]
      }
    ]
  }
}