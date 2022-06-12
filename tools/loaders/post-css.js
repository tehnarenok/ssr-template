module.exports = ({ options = {}, } = {}) => ({
    loader: 'postcss-loader',
    options: {
        ...options,
    },
});
