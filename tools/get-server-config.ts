import nodeExternals from 'webpack-node-externals';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import { Configuration } from 'webpack';
import path from 'path';

import cssRule from './rules/css';
import jsRule from './rules/js';
import tsRule from './rules/ts';
import imagesRule from './rules/image';
import fontsRule from './rules/font';
import htmlRule from './rules/html';

import providePlugin from './plugins/provide';
import definePlugin from './plugins/define';
import { IEnv, IGetServerConfigProps } from './types';

const { NODE_ENV, HOT, } = process.env;
const ENV = NODE_ENV as IEnv || 'development';

const getServerConfig = (props: IGetServerConfigProps = {}): Configuration => {
    const {
        entries = {},
        serverBuildDir = path.join(process.cwd(), './build/server/'),
        platform = 'desktop',
        urlLoaderOptions = {},
        useMobileOptimizedAssets = false,
        publicPath = '/assets/',
    } = props;

    return {
        watch: Boolean(HOT),
        mode: ENV === 'production' ? 'production' : 'development',
        name: 'server',
        devtool: 'source-map',
        target: 'node',
        entry: entries,
        output: {
            path: serverBuildDir,
            filename: '[name].js',
            libraryTarget: 'commonjs2',
            clean: {
                keep: /(assets|loadable)\.json/,
            },
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
            minimize: false,
            runtimeChunk: 'single',
            splitChunks: {
                chunks: 'all',
                name: 'common.server.chunk',
            },
        },
        plugins: [
            definePlugin({ env: ENV, platform, useMobileOptimizedAssets, browser: false, }),
            providePlugin({ target: 'node', }),
            new MiniCssExtractPlugin(),
            new CompressionPlugin()
        ],
        module: {
            parser: {
                javascript: {
                    commonjsMagicComments: true,
                },
            },
            rules: [
                jsRule({ env: ENV, target: 'node', }),
                tsRule({ env: ENV, target: 'node', }),
                cssRule({ env: ENV, discard: false, }),
                imagesRule({
                    env: ENV,
                    urlLoaderOptions: {
                        publicPath,
                        ...urlLoaderOptions,
                    },
                }),
                fontsRule({ discard: true, }),
                htmlRule({ discard: true, })
            ],
        },
        node: {
            global: false,
            __filename: false,
            __dirname: false,
        },
        externalsPresets: { node: true, },
        externals: [
            nodeExternals({
                modulesFromFile: {
                    include: [ 'dependencies' ],
                },
            })
        ],
    };
};

export default getServerConfig;
