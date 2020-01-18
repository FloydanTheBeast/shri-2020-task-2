const path = require('path')

module.exports = {
    target: 'node',
    entry: {
        app: './index.js'
    },
    output: {
        path: path.join(__dirname, '/build'),
        publicPath: '/',
        filename: 'linter.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
}