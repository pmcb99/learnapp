module.exports = {
    // ... other configurations ...
    module: {
        rules: [
            // ... other rules ...
            {
                test: /\.node$/,
                use: 'node-loader'
            }
        ]
    },
    devtool: 'source-map'
};