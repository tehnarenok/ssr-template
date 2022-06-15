import { IImageWebpackLoaderProps } from 'tools/types';
import { RuleSetUseItem } from 'webpack';

const imageWebpackLoader = (props: IImageWebpackLoaderProps = {}): RuleSetUseItem => ({
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
            quality: [ 1, 1 ],
        },
        svgo: {
        },
        ...(props.options),
    },
});

export default imageWebpackLoader;
