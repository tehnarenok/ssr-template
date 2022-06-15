import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { WebpackPluginInstance } from 'webpack';
import { IExtractCssProps } from '../types';
import getBundlePrefix from '../get-bundle-prefix';

const extractCss = (props: IExtractCssProps): WebpackPluginInstance => {
    const {
        env,
        bundleName,
    } = props;

    return new MiniCssExtractPlugin({
        filename: env === 'production' ?
            `${getBundlePrefix(bundleName)}[name].[contenthash].css` :
            `${getBundlePrefix(bundleName)}[name].css`,
        chunkFilename: env === 'production' ?
            `${getBundlePrefix(bundleName)}[name].[contenthash].css` :
            `${getBundlePrefix(bundleName)}[name].css`,
        ignoreOrder: true,
    });
};

export default extractCss;
