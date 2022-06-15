import { IHtmlRuleProps } from 'tools/types';
import { RuleSetRule } from 'webpack';
import fileLoader from '../loaders/file';
import nullLoader from '../loaders/null';

const htmlRule = (props: IHtmlRuleProps = {}): RuleSetRule => ({
    test: /\.html$/,
    use: props.discard ? [
        nullLoader()
    ] : [
        fileLoader()
    ],
});

export default htmlRule;
