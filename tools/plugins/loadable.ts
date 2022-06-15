import LoadablePlugin from '@loadable/webpack-plugin';
import { Compiler, WebpackPluginInstance } from 'webpack';
import { ILoadablePluginProps } from '../types';
import getBundlePrefix from '../get-bundle-prefix';

const loadablePlugin = (props: ILoadablePluginProps): WebpackPluginInstance => {
    const loaderPlugin = new LoadablePlugin({
        filename: `${getBundlePrefix(props.bundleName)}loadable.json`,
        outputAsset: false,
        writeToDisk: {
            filename: props.path,
        },
    });

    const plugin: WebpackPluginInstance = {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        apply: (compiler: Compiler) => loaderPlugin.apply(compiler),
    };

    return plugin;
};

export default loadablePlugin;
