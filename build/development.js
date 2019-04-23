const webpackMerge = require('webpack-merge')
const commonConf = require('./common')
const devConf = {
  mode: 'development',
  devtool: '#@cheap-module-eval-source-map',
  devServer: {
    port: 8999,
    hot: true,
    historyApiFallback: true,
    https: true,
    watchOptions: {
      ignored: /node_modules/,
      aggregateTimeout: 1500,
    },
    proxy: {
      '/api/*/': {
        target: 'https://webpf.net',
        changeOrigin: true,
      },
    },
  },
}

module.exports = webpackMerge(commonConf, devConf)
