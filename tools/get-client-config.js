const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const path = require('path');

const getBundlePrefix = require('./get-bundle-prefix');

const assetsPlugin = require('./plugins/assets');
const definePlugin = require('./plugins/define');
const extractCssPlugin = require('./plugins/extract-css');
const loadablePlugin = require('./plugins/loadable');
const providePlugin = require('./plugins/provide');
const sourcemapDevtoolsPlugin = require('./plugins/sourcemap-devtools');
const compressionPlugin = require('./plugins/compression');
const hotReloadPlugin = require('./plugins/hot-reload');

const jsRule = require('./rules/js');
const tsRule = require('./rules/ts');
const cssRule = require('./rules/css');
const imagesRule = require('./rules/image');
const fontsRule = require('./rules/font');
const htmlRule = require('./rules/html');

const { NODE_ENV, HOT, } = process.env;
const ENV = NODE_ENV || 'development';

module.exports = ({
    bundleName = '',
    bundlePath = '',
    publicPath = '/build/assets/',
    clientBuildDir = path.join(process.cwd(), './build/assets/'),
    serverBuildDir = path.join(process.cwd(), './build/server/'),
    platform = 'desktop',
    sourceMapsPath,
    useMobileOptimizedAssets = false,
    disableChunking = false,
}) => {
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
            extensions: [ '.ts', '.tsx', '.js', '.jsx', '.json' ],
            alias: {
                core: path.resolve(__dirname, '..', 'core'),
                view: path.resolve(__dirname, '..', 'view'),
                app: path.resolve(__dirname, '..', 'app'),
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
                jsRule({ env: ENV, hot: HOT, target: 'web', }),
                tsRule({ env: ENV, target: 'web', }),
                cssRule({ env: ENV, }),
                imagesRule({
                    env: ENV,
                }),
                fontsRule(),
                htmlRule()
            ],
        },
        externals: [
            {
                react: 'React',
                'react-dom': 'ReactDOM',
            }
        ],
    };
};
