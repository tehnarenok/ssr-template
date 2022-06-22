import { ICssRuleProps } from 'tools/types';
import { RuleSetRule } from 'webpack';
import cssLoader from '../loaders/css';
import postcssLoader from '../loaders/post-css';
import extractCssLoader from '../loaders/extract-css';
import nullLoader from '../loaders/null';

const cssRule = (props: ICssRuleProps): RuleSetRule => {
    const { discard, } = props;

    const localIdentName = props.env === 'development' ? '[folder]__[local]--[hash:base64:5]' : '[hash:base64]';

    const cssLoaderOptions = {
        modules: {
            localIdentName,
            exportLocalsConvention: 'camelCase',
            exportOnlyLocals: props.discard,
        },
    };

    const rule: RuleSetRule = {
        test: /\.css$/,
        oneOf: [
            {
                test: /\.module\.css$/,
                use: discard ? [
                    cssLoader({ ...cssLoaderOptions, })
                ] : [
                    extractCssLoader(),
                    cssLoader({ ...cssLoaderOptions, }),
                    postcssLoader()
                ],
            },
            {
                use: discard ? [
                    nullLoader()
                ] : [
                    extractCssLoader(),
                    cssLoader(),
                    postcssLoader()
                ],
            }
        ],
    };

    return rule;
};

export default cssRule;
