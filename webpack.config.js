const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');

module.exports = {
    entry: {
        app: './src/app.js',
    },
    output: {
        filename: 'app.bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
    	rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader'],
                    publicPath: '/dist'
                })
            },
            {   test: /\.js$/,
                exclude: /node_modules/,
                use: "babel-loader"
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9090,
        stats: "errors-only"
    },
    plugins: [
	    new HtmlWebpackPlugin({
	      title: 'React App',
	      minify: {
	      	collapseWhitespace: true
	      },
	      hash: true,
	      filename: 'index.html',
	      template: './src/index.ejs' // Load custom template
	    }),
        new ExtractTextPlugin({
            filename: './css/app.css',
            allChunks: true
        }),
  	]
};
