const AssetsPlugin = require('assets-webpack-plugin');

const getBundlePrefix = require('../get-bundle-prefix');

module.exports = ({ env, path, bundleName, }) => {
    return new AssetsPlugin({
        path,
        filename: `${getBundlePrefix(bundleName)}assets.json`,
        update: true,
        prettyPrint: env !== 'production',
    });
};
