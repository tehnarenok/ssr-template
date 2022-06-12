const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const getBundlePrefix = require('../get-bundle-prefix');

module.exports = ({ env, bundleName, } = {}) => {
    return new MiniCssExtractPlugin({
        filename: env === 'production' ?
            `${getBundlePrefix(bundleName)}[name].[contenthash].css` :
            `${getBundlePrefix(bundleName)}[name].css`,
        chunkFilename: env === 'production' ?
            `${getBundlePrefix(bundleName)}[name].[contenthash].css` :
            `${getBundlePrefix(bundleName)}[name].css`,
        ignoreOrder: true,
    });
};
