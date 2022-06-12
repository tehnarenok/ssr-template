const zlib = require('zlib');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = ({ algorithm, } = {}) => {
    const isBrotli = algorithm === 'brotliCompress';

    return new CompressionPlugin({
        filename: `[path][base].${isBrotli ? 'br' : 'gz'}`,
        algorithm,
        test: /\.(css|js|svg)$/,
        compressionOptions: isBrotli ? {
            params: {
                [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
            },
        } : {
            level: 9,
        },
        threshold: 0,
        minRatio: Infinity,
    });
};
