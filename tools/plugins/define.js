const { DefinePlugin, } = require('webpack');

module.exports = ({ env, platform, browser, useMobileOptimizedAssets, }) => {
    return new DefinePlugin({
        IS_DEBUG: JSON.stringify(env !== 'production'),
        BUNDLE_LANG: JSON.stringify('ru'),
        BUNDLE_PLATFORM: JSON.stringify(platform),
        USE_WITHOUT_HOVER_STYLES: JSON.stringify(useMobileOptimizedAssets),
        'process.env.NODE_ENV': JSON.stringify(
            env === 'production' ? 'production' : 'development'
        ),
        'process.env.__BROWSER__': JSON.stringify(browser),
    });
};
