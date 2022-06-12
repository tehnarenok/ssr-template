const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = ({ options = {}, } = {}) => ({
    loader: MiniCssExtractPlugin.loader,
    options,
});
