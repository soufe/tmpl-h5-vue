const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
let path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: process.env.NODE_ENV === 'development' ? './' : process.env.BASE_URL,
  outputDir: 'dist',
  assetsDir: '',
  indexPath: 'index.html',
  filenameHashing: true,
  lintOnSave: true,
  runtimeCompiler: false,
  transpileDependencies: [],
  crossorigin: 'anonymous',
  integrity: false,
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              drop_debugger: true,
              drop_console: true,
              pure_funcs: ['console.log']
            },
            output: {
              beautify: false,
              comments: false
            }
          },
          sourceMap: false,
          parallel: true
        })
      )
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('api', resolve('src/api'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('request', resolve('src/request'))
      .set('router', resolve('src/router'))
      .set('store', resolve('src/store'))
      .set('utils', resolve('src/utils'))
      .set('views', resolve('src/views'))
    config.output.filename('[name].[hash].js').end()
  },
  devServer: {
    proxy: {
      '/api/': {
        target: 'https://store.sousoushenbian.cn/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api/': ' '
        }
      },
      '/apis/': {
        target: 'https://wxt.shangshangkeji.com/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/apis/': ' '
        }
      }
    }
  }
}
