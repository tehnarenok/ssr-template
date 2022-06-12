module.exports = ({ env, target, preventDidCatchWrapping, hot, } = {}) => ({
    loader: 'babel-loader',
    options: {
        cacheDirectory: env !== 'production',
        rootMode: 'upward',
        caller: {
            name: target,
            preventDidCatchWrapping,
            hot,
        },
    },
});
