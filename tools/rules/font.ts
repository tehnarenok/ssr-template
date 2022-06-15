import { IFontRuleProps } from 'tools/types';
import { RuleSetRule } from 'webpack';
import fileLoader from '../loaders/file';
import nullLoader from '../loaders/null';

const fontRule = (props: IFontRuleProps = {}): RuleSetRule => ({
    test: /\.(eot|woff2|woff|ttf|otf)/,
    use: props.discard ? [
        nullLoader()
    ] : [
        fileLoader()
    ],
});

export default fontRule;
