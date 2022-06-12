const { HotModuleReplacementPlugin } = require('webpack');

module.exports = () => {
    return new HotModuleReplacementPlugin();
};
