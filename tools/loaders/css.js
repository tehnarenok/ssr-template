module.exports = ({ options = {}, } = {}) => ({
    loader: 'css-loader',
    options: {
        importLoaders: 1,
        ...options,
    },
});
