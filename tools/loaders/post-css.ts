import { IPostCssLoaderProps } from 'tools/types';
import { RuleSetUseItem } from 'webpack';

const postcssLoader = (props: IPostCssLoaderProps = {}): RuleSetUseItem => ({
    loader: 'postcss-loader',
    options: {
        ...(props.options),
    },
});

export default postcssLoader;
