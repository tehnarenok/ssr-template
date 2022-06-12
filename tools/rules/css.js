const cssLoader = require('../loaders/css');
const postcssLoader = require('../loaders/post-css');
const extractCssLoader = require('../loaders/extract-css');
const nullLoader = require('../loaders/null');

module.exports = ({ env, discard, }) => {
    const cssLoaderOptions = {
        modules: {
            localIdentName: '[folder]__[local]--[hash:base64:5]',
            exportLocalsConvention: 'camelCase',
            exportOnlyLocals: false,
        },
    };

    return {
        test: /\.css$/,
        oneOf: [
            {
                test: /\.module\.css$/,
                use: discard ? [
                    cssLoader({
                        options: {
                            ...cssLoaderOptions,
                            ...{ modules: {
                                exportOnlyLocals: false,
                            }, },
                        },
                    })
                ] : [
                    extractCssLoader({ env, }),
                    cssLoader({
                        options: {
                            ...cssLoaderOptions,
                        },
                    }),
                    postcssLoader()
                ],
            },
            {
                use: discard ? [
                    nullLoader()
                ] : [
                    extractCssLoader({ env, }),
                    cssLoader(),
                    postcssLoader()
                ],
            }
        ],
    };
};
