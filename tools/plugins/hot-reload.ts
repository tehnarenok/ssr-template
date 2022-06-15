import { HotModuleReplacementPlugin, WebpackPluginInstance } from 'webpack';

const hotReload = (): WebpackPluginInstance => {
    return new HotModuleReplacementPlugin();
};

export default hotReload;
