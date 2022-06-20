import production from './production';
import testing from './testing';
import development from './development';
import defaultConfig from './default';
import { ICommonConfigProps } from '../types';

const { NODE_ENV = 'development', } = process.env;

const getConfigProps = (): ICommonConfigProps => {
    switch (NODE_ENV) {
        case 'production': {
            return {
                ...defaultConfig,
                ...production,
            };
        }
        case 'testing': {
            return {
                ...defaultConfig,
                ...testing,
            };
        }
        default: {
            return {
                ...defaultConfig,
                ...development,
            };
        }
    }
};

export default getConfigProps;
