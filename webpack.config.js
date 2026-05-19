const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { modules: 'commonjs' }]
              ]
            }
          }
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
      }),
      new webpack.DefinePlugin({
        'process.env.API_URL': JSON.stringify(
          isProduction
            ? process.env.API_URL || 'https://helpdesk-backend-production.up.railway.app'  // замените на ваш Railway URL
            : 'http://localhost:7070'
        )
      }),
    ],
    devServer: {
      port: 9000,
      proxy: isProduction ? undefined : [
        {
          context: ['/'],
          target: 'http://localhost:7070',
          changeOrigin: true,
        },
      ],
    },
  };
};