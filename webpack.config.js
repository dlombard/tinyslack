const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const autoprefixer = require('autoprefixer')

module.exports = {
  context: path.resolve(__dirname),
  entry: {
    index: path.resolve(__dirname, 'src/entry/index.js'),
    client: path.resolve(__dirname, 'src/entry/App.js'),
    login: path.resolve(__dirname, 'src/entry/login.js'),
    signup: path.resolve(__dirname, 'src/entry/signup.js'),
    'recover-account-names': path.resolve(__dirname, 'src/entry/recover-account-names.js'),
    'reset-password': path.resolve(__dirname, 'src/entry/reset-password.js'),
    'set-new-password': path.resolve(__dirname, 'src/entry/set-new-password.js'),
  },
  output: {
    path: path.resolve(__dirname, './dist/'),
    filename: 'bundles/[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          // creates style nodes from JS strings
          {
            loader: 'style-loader',
            options: {
              sourceMap: true,
            },
          },

          {
            // translates CSS into CommonJS
            loader: 'css-loader',
            query: {
              modules: true,
              sourceMap: true,
              importLoaders: 2,
              localIdentName: '[name]__[local]__[hash:base64:5]',
            },
          },

          {
            // auto prefixes for browser support
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: () => [
                autoprefixer({to: path.resolve(__dirname, '/dist/')}),
              ],
            },
          },

          {
            // compiles Sass to CSS
            loader: 'sass-loader',
            options: {
              includePaths: [
                path.resolve(__dirname, './src/styles'),
                path.resolve(__dirname, './src/styles/base/fonts'),
              ],
              sourceMap: true,
            },
          },
        ],
      },

      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        use: {loader: 'babel-loader'},
      },

      {
        // Load/inline images at url()'s in CSS
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          publicPath: '/',
          useRelativePath: process.env.NODE_ENV === 'production',
          name: 'images/[name]_[hash].[ext]',
        },
      },

      {
        // Load/inline assets at url()'s in CSS
        test: /\.(svg|eot|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          publicPath: '/',
          useRelativePath: process.env.NODE_ENV === 'production',
          name: 'fonts/[name]_[hash].[ext]',
        },
      },
    ],
  },

  devtool: 'source-map',

  plugins: [
    new CleanWebpackPlugin([path.resolve(__dirname, './dist/')]),
    new ManifestPlugin({publicPath: '/'}),
  ],
}
