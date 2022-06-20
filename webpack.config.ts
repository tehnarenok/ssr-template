import getConfig from './tools/get-config';
import getConfigProps from './tools/configProps/getConfigProps';

const commonConfig = getConfigProps();

const configs = getConfig(
    './entries',
    { client: commonConfig, server: commonConfig, }
);

export default configs;
