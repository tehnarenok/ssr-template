import getConfig from './tools/get-config';

const commonConfig = {
    // platform: 'desktop',
    // publicPath: `${config.assetsPath}/`,
};

const configs = getConfig(
    './entries',
    { client: commonConfig, server: commonConfig, }
);

export default configs;
