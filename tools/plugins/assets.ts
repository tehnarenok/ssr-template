import AssetsPlugin from 'assets-webpack-plugin';
import { WebpackPluginInstance } from 'webpack';
import { IAssetsPluginProps } from '../types';
import getBundlePrefix from '../get-bundle-prefix';

const assetsPlugin = (props: IAssetsPluginProps): WebpackPluginInstance => {
    return new AssetsPlugin({
        path: props.path,
        filename: `${getBundlePrefix(props.bundleName)}assets.json`,
        update: true,
        prettyPrint: props.env !== 'production',
    });
};

export default assetsPlugin;
