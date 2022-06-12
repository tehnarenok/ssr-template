const urlLoader = require('../loaders/url');
const rawLoader = require('../loaders/raw');
const imageWebpackLoader = require('../loaders/image-webpack');
const nullLoader = require('../loaders/null');

module.exports = ({
    env,
    urlLoaderOptions,
    discard,
}) => {
    const commonLoaders = env === 'production' ?
        [ imageWebpackLoader() ] :
        [];

    return {
        test: /\.(png|svg|jpe?g|gif|webp)$/,
        oneOf: [
            {
                test: /\.svg$/,
                use: [
                    rawLoader(),
                    ...commonLoaders
                ],
            },
            {
                use: discard ? [
                    nullLoader()
                ] : [
                    urlLoader({ options: urlLoaderOptions, }),
                    ...commonLoaders
                ],
            }
        ].filter(Boolean),
    };
};
