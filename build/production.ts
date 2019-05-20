import webpackMerge from 'webpack-merge'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import { commonConf } from './common'
import path from 'path'
import { Configuration } from 'webpack'
const prodConf: Configuration = {
  mode: 'production',
  context: path.resolve(__dirname, '../'),
  devtool: 'source-map',
  output: {
    filename: '[name].[hash].bundle.js',
    path: path.resolve(__dirname, '../dist')
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [new ForkTsCheckerWebpackPlugin()]
}

export default webpackMerge(commonConf, prodConf)
