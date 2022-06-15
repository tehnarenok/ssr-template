import { RuleSetUseItem } from 'webpack';

const fileLoader = (): RuleSetUseItem => ({
    loader: 'file-loader',
});

export default fileLoader;
