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

export default webpackMerge(commonConf, devConf)
