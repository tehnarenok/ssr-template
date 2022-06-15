import { ICssLoaderProps } from 'tools/types';
import { RuleSetUseItem } from 'webpack';

const cssLoader = (props: ICssLoaderProps = {}): RuleSetUseItem => ({
    loader: 'css-loader',
    options: {
        importLoaders: 1,
        ...props,
    },
});

export default cssLoader;
