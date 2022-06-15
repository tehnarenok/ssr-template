import { IJsRuleProps } from 'tools/types';
import { RuleSetRule } from 'webpack';
import babelLoader from '../loaders/babel';

const jsRule = (props: IJsRuleProps): RuleSetRule => ({
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: [
        babelLoader(props)
    ],
});

export default jsRule;
