const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  entry: './frontend/index.js',  // path to our input file
  output: {
    filename: 'index-bundle.js',  // output bundle file name
    path: path.resolve(__dirname, './static'),  // path to our Django static directory
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    plugins: [new TsconfigPathsPlugin()],
  },
  module: {
      rules: [{
          // Include ts, tsx, js, and jsx files.
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: { presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"] }
      },
    {
      test: /\.css$/,
      use: ['css-loader']
    }],
  }
};