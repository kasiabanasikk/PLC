module.exports = {
    entry: ["babel-polyfill", "./src/client.js"],
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ['css-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.json']
    }
};