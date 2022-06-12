const { SourceMapDevToolPlugin, } = require('webpack');

module.exports = ({ sourceMapsPath = '', }) => {
    return new SourceMapDevToolPlugin({
        append: `\n//# sourceMappingURL=${sourceMapsPath}[file].map`,
        filename: '../sourcemaps/[file].map',
    });
};
