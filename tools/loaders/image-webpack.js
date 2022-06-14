module.exports = ({ options = {}, } = {}) => ({
    loader: 'image-webpack-loader',
    options: {
        mozjpeg: {
            progressive: true,
            quality: 1,
        },
        gifsicle: {
            interlaced: false,
            quality: 1,
        },
        optipng: {
            enable: false,
        },
        pngquant: {
            speed: 4,
            quality: [ 1, 1 ],
        },
        svgo: {
        },
        ...options,
    },
});
