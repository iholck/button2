var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    mode: 'development',
    resolve: {
        extensions: ['.js', '.vue', '.css']
    },
    module: {
        rules: [
            {
                test: /\.vue?$/,
                exclude: /(node_modules)/,
                use: 'vue-loader'
            },
            {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                include: /(node_modules)/,
                use: [
                  'vue-style-loader'
                ]
              }
        ]
    },
    plugins: [
        
        new HtmlWebpackPlugin({
        template: './src/index.html'
    })],
    devServer: {
        historyApiFallback: true,
        allowedHosts: [
            '*'
           
          ]
    },
    externals: {
        // global app config object
        config: JSON.stringify({
            apiUrl: `https://dockersvr.local:4000`
        })
    }
}