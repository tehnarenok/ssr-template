import { DefinePlugin, WebpackPluginInstance } from 'webpack';
import { IDefinePluginProps } from '../types';

const definePlugin = (props: IDefinePluginProps): WebpackPluginInstance => {
    return new DefinePlugin({
        IS_DEBUG: JSON.stringify(props.env !== 'production'),
        BUNDLE_LANG: 'ru',
        BUNDLE_PLATFORM: props.platform,
        USE_WITHOUT_HOVER_STYLES: JSON.stringify(props.useMobileOptimizedAssets),
        'process.env.NODE_ENV': JSON.stringify(
            props.env === 'production' ? 'production' : 'development'
        ),
        'process.env.__BROWSER__': JSON.stringify(props.browser),
    });
};

export default definePlugin;
