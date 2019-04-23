const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const tsImportPluginFactory = require('ts-import-plugin')

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
  entry: {
    app: path.resolve(__dirname, '../src/app.tsx'),
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[hash].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(jsx|tsx|js|ts)$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [
              tsImportPluginFactory({
                libraryName: 'antd',
                libraryDirectory: 'lib',
                style: true,
              }),
            ],
          }),
          compilerOptions: {
            module: 'es2015',
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(s)?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/static'),
      title: 'WebPerf',
    }),
  ],
}
