import CompressionPlugin from 'compression-webpack-plugin';
import { WebpackPluginInstance } from 'webpack';
import zlib from 'zlib';
import { ICompressionPluginProps } from '../types';

const compressionPlugin = (props: ICompressionPluginProps = {}): WebpackPluginInstance => {
    const isBrotli = props.algorithm === 'brotliCompress';

    return new CompressionPlugin({
        filename: `[path][base].${isBrotli ? 'br' : 'gz'}`,
        algorithm: props.algorithm,
        test: /\.(css|js|svg)$/,
        compressionOptions: {
            level: isBrotli ? zlib.constants.BROTLI_PARAM_QUALITY : 9,
        },
        threshold: 0,
        minRatio: Infinity,
    });
};

export default compressionPlugin;
