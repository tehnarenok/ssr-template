import { SourceMapDevToolPlugin, WebpackPluginInstance } from 'webpack';
import { ISourceMapDevToolPluginProps } from '../types';

const sourceMapDevToolPlugin = (props: ISourceMapDevToolPluginProps): WebpackPluginInstance => {
    return new SourceMapDevToolPlugin({
        append: `\n//# sourceMappingURL=${props.sourceMapsPath ?? ''}[file].map`,
        filename: '../sourcemaps/[file].map',
    });
};

export default sourceMapDevToolPlugin;
