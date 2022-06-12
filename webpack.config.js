const config = require('./configs/webpack/index');
const getConfig = require('./tools/get-config');

const commonConfig = {
    platform: 'desktop',
    publicPath: `${config.assetsPath}/`,
};

module.exports = getConfig({
    folder: './entries',
    config: { client: commonConfig, server: commonConfig, },
});
