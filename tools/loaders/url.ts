import { IUrlLoaderProps } from 'tools/types';
import { RuleSetUseItem } from 'webpack';

const urlLoader = (props: IUrlLoaderProps = {}): RuleSetUseItem => ({
    loader: 'url-loader',
    options: {
        limit: 0,
        ...(props.options),
    },
});

export default urlLoader;
