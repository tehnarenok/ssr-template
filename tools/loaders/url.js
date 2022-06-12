module.exports = ({ options = {}, } = {}) => ({
    loader: 'url-loader',
    options: {
        limit: 0,
        ...options,
    },
});
