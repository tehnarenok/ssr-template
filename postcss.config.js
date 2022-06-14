module.exports = {
    plugins: [
        require('postcss-import')(),
        require('postcss-apply')(),
        require('postcss-nested')(),
        require('postcss-preset-env')({
            preserve: false,
            stage: false,
            autoprefixer: { grid: true, },
            features: {
                'all-property': true,
                'custom-media-queries': true,
                'custom-properties': true,
                'double-position-gradients': false,
            },
        }),
        require('postcss-color-function'),
        require('postcss-flexbugs-fixes'),
        require('postcss-reporter')({ clearAllMessages: true, })
    ],
};
