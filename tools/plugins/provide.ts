import { ProvidePlugin, WebpackPluginInstance } from 'webpack';
import { IProvidePluginProps } from '../types';

const providePlugin = (props: IProvidePluginProps): WebpackPluginInstance => {
    return new ProvidePlugin({
        React: 'react',
        Buffer: props.target === 'web' ? [ 'buffer', 'Buffer' ] : [],
    });
};

export default providePlugin;
