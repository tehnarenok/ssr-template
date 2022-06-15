import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { IExtractCssLoaderProps } from 'tools/types';
import { RuleSetUseItem } from 'webpack';

const extractCssLoader = (props: IExtractCssLoaderProps = {}): RuleSetUseItem => ({
    loader: MiniCssExtractPlugin.loader,
    options: props.options,
});

export default extractCssLoader;
