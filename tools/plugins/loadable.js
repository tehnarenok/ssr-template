const LoadablePlugin = require('@loadable/webpack-plugin');

const getBundlePrefix = require('../get-bundle-prefix');

module.exports = options => {
    return new LoadablePlugin({
        filename: `${getBundlePrefix(options.bundleName)}loadable.json`,
        outputAsset: false,
        writeToDisk: {
            filename: options.path,
        },
    });
};
