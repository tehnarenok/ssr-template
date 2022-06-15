import { RuleSetUseItem } from 'webpack';

const rawLoader = (): RuleSetUseItem => ({
    loader: 'raw-loader',
});

export default rawLoader;
