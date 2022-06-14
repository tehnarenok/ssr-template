const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const cssRule = require('./rules/css');
const jsRule = require('./rules/js');
const tsRule = require('./rules/ts');
const imagesRule = require('./rules/image');
const fontsRule = require('./rules/font');
const htmlRule = require('./rules/html');

const providePlugin = require('./plugins/provide');
const definePlugin = require('./plugins/define');

const { NODE_ENV, HOT, } = process.env;
const ENV = NODE_ENV || 'development';

module.exports = ({
    entries = {},
    serverBuildDir = path.join(process.cwd(), './build/server/'),
    platform = 'desktop',
    publicPath = '/build/assets/',
    urlLoaderOptions = {},
    useMobileOptimizedAssets = false,
} = {}) => {
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
            definePlugin({ env: ENV, platform, useMobileOptimizedAssets, }),
            providePlugin({ target: 'node', }),
            new MiniCssExtractPlugin()
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
                        emitFile: false,
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
                    fileName: './package.json',
                    include: [ 'dependencies' ],
                },
            })
        ],
    };
};
