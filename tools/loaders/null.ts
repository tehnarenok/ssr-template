import { RuleSetUseItem } from 'webpack';

const nullLoader = (): RuleSetUseItem => ({
    loader: 'null-loader',
});

export default nullLoader;
