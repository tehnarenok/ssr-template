const babelLoader = require('../loaders/babel');

module.exports = ({ env, target, preventDidCatchWrapping, hot, }) => ({
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: [
        babelLoader({ env, target, preventDidCatchWrapping, hot, })
    ],
});
