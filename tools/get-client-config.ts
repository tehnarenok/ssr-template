import TerserPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import { Configuration } from 'webpack';
import path from 'path';

import getBundlePrefix from './get-bundle-prefix';

import assetsPlugin from './plugins/assets';
import definePlugin from './plugins/define';
import extractCssPlugin from './plugins/extract-css';
import loadablePlugin from './plugins/loadable';
import providePlugin from './plugins/provide';
import sourcemapDevtoolsPlugin from './plugins/sourcemap-devtools';
import compressionPlugin from './plugins/compression';
import hotReloadPlugin from './plugins/hot-reload';

import jsRule from './rules/js';
import tsRule from './rules/ts';
import cssRule from './rules/css';
import imagesRule from './rules/image';
import fontsRule from './rules/font';
import htmlRule from './rules/html';
import { IEnv, IGetClientConfigsProps } from './types';

const { NODE_ENV, HOT, } = process.env;
const ENV: IEnv = NODE_ENV as IEnv || 'development';

const getClientConfigs = (props: IGetClientConfigsProps): Configuration => {
    const {
        bundleName = '',
        bundlePath = '',
        publicPath = '/assets/',
        clientBuildDir = path.join(process.cwd(), './build/assets/'),
        serverBuildDir = path.join(process.cwd(), './build/server/'),
        platform = 'desktop',
        sourceMapsPath,
        useMobileOptimizedAssets = false,
        disableChunking = false,
    } = props;

    const name = `${getBundlePrefix(bundleName)}client`;

    return {
        watch: Boolean(HOT),
        mode: ENV === 'production' ? 'production' : 'development',
        name,
        devtool: ENV === 'production' ? false : 'eval-source-map',
        target: 'web',
        entry: {
            client: [
                bundlePath
            ],
        },
        output: {
            path: clientBuildDir,
            publicPath,
            filename: ENV === 'production' ?
                `${getBundlePrefix(bundleName)}[name].[chunkhash].js` :
                `${getBundlePrefix(bundleName)}[name].js`,
            chunkFilename: ENV === 'production' ?
                `${getBundlePrefix(bundleName)}[name].[chunkhash].js` :
                `${getBundlePrefix(bundleName)}[name].js`,
            crossOriginLoading: 'anonymous',
        },
        resolve: {
            extensions: [ '.ts', '.tsx', '.js', '.jsx', '.json', '.css' ],
            alias: {
                core: path.resolve(__dirname, '..', 'core'),
                view: path.resolve(__dirname, '..', 'view'),
                app: path.resolve(__dirname, '..', 'app'),
                '~': path.resolve(__dirname, '..', 'node_modules'),
            },
        },
        stats: {
            preset: 'errors-warnings',
        },
        optimization: {
            runtimeChunk: disableChunking ? false : 'single',
            splitChunks: disableChunking ? undefined : undefined,
            minimizer: [
                new TerserPlugin({ parallel: true, }),
                new CssMinimizerPlugin({
                    minimizerOptions: {
                        preset: [
                            'default',
                            {
                                discardComments: { removeAll: true, },
                                svgo: false,
                                colormin: false,
                            }
                        ],
                    },
                })
            ],
        },
        plugins: [
            definePlugin({ env: ENV, bundleName, platform, useMobileOptimizedAssets, browser: true, }),
            assetsPlugin({ env: ENV, path: serverBuildDir, bundleName, }),
            loadablePlugin({ path: serverBuildDir, bundleName, }),
            extractCssPlugin({ env: ENV, bundleName, }),
            providePlugin({ target: 'web', })
        ]
            .concat(ENV === 'production' ? [
                sourcemapDevtoolsPlugin({ sourceMapsPath, }),
                compressionPlugin({ algorithm: 'brotliCompress', }),
                compressionPlugin({ algorithm: 'gzip', })
            ] : [])
            .concat(HOT ? [
                hotReloadPlugin()
            ] : []),
        module: {
            rules: [
                jsRule({ env: ENV, hot: Boolean(HOT), target: 'web', }),
                tsRule({ env: ENV, target: 'web', }),
                cssRule({ env: ENV, time: props.time, }),
                imagesRule({
                    env: ENV,
                }),
                fontsRule(),
                htmlRule()
            ],
        },
    };
};

export default getClientConfigs;
