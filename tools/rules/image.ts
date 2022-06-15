import { IImageRuleProps } from 'tools/types';
import { RuleSetRule } from 'webpack';

import urlLoader from '../loaders/url';
import rawLoader from '../loaders/raw';
import imageWebpackLoader from '../loaders/image-webpack';
import nullLoader from '../loaders/null';

const imageRule = (props: IImageRuleProps): RuleSetRule => {
    const commonLoaders = props.env === 'production' ?
        [ imageWebpackLoader() ] :
        [];

    const rule: RuleSetRule = {
        test: /\.(png|svg|jpe?g|gif|webp)$/,
        oneOf: [
            {
                test: /\.svg$/,
                use: [
                    rawLoader(),
                    ...commonLoaders
                ],
            },
            {
                use: props.discard ? [
                    nullLoader()
                ] : [
                    urlLoader({ options: props.urlLoaderOptions, }),
                    ...commonLoaders
                ],
            }
        ].filter(Boolean),
    };

    return rule;
};

export default imageRule;
