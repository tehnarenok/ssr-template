const babelLoader = require('../loaders/babel');

module.exports = ({ env, target, preventDidCatchWrapping, }) => ({
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [
        babelLoader({ env, target, preventDidCatchWrapping, })
    ],
});
