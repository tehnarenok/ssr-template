import { ITsRuleProps } from 'tools/types';
import { RuleSetRule } from 'webpack';
import babelLoader from '../loaders/babel';

const tsRule = (props: ITsRuleProps): RuleSetRule => ({
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [
        babelLoader(props)
    ],
});

export default tsRule;
