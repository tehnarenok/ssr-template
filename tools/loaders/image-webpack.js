module.exports = ({ options = {}, } = {}) => ({
    loader: 'image-webpack-loader',
    options: {
        mozjpeg: {
            progressive: true,
        },
        gifsicle: {
            interlaced: false,
        },
        optipng: {
            optimizationLevel: 7,
        },
        pngquant: {
            speed: 4,
            quality: '65-90',
        },
        svgo: {
            plugins: [
                {
                    removeViewBox: false,
                }
            ],
        },
        ...options,
    },
});
