import { IBabelLoaderProps } from 'tools/types';
import { RuleSetUseItem } from 'webpack';

const babelLoader = (props: IBabelLoaderProps = {}): RuleSetUseItem => ({
    loader: 'babel-loader',
    options: {
        cacheDirectory: props.env !== 'production',
        rootMode: 'upward',
        caller: {
            name: props.target,
            preventDidCatchWrapping: props.preventDidCatchWrapping,
            hot: props.hot,
        },
    },
});

export default babelLoader;
