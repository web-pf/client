import webpackMerge from 'webpack-merge'
import { commonConf } from './common'
import { Configuration } from 'webpack'
const devConf: Configuration = {
  mode: 'development',
  devtool: '#@cheap-module-eval-source-map',
  devServer: {
    port: 8999,
    hot: true,
    historyApiFallback: true,
    watchOptions: {
      ignored: /node_modules/,
      aggregateTimeout: 1500,
    },
    disableHostCheck: true,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://localhost:5000/',
        changeOrigin: true,
      }
    },
  },
}

export default webpackMerge(commonConf, devConf)
