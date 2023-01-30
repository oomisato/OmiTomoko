const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
 const env = dotenv.config().parsed;
 const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {

  entry: {
    app: './src/client/index.tsx',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(env)
    }),
    new HtmlWebpackPlugin({

    })
  ],
  module: {
    rules: [

        {
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
        }, 
                 
        {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        },
        
        {
          test: /\.(png|jpe?g|gif|glb)$/i,
          loader: 'file-loader',
          options: {
            name: 'images/[name].[ext]',
          },
        },
       

    ],
},
resolve: {
    extensions: ['.tsx', '.ts', '.css','.js'],
},
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../../dist/client'),
  },


};