import glob from 'glob';
import path from 'path';
import { IServerEntityProps } from '../entries/types';

const { PRJ_DIR, } = process.env;

interface IAsset {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: {[key: string]: string}
}

interface IBundle {
    assets: IAsset,
    server: (props: IServerEntityProps) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

interface IBundles {
    [key: string]: IBundle
}

const getBundles = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const bundles: IBundles = {};

    if (!PRJ_DIR) {
        throw new Error([
            'Еhe environment variable PROJECT_DIR is not defined'
        ].join('\n'));
    }

    const patterns = [
        `${path.join(PRJ_DIR, 'build')}/server/*.server.js`,
        `${path.join(PRJ_DIR, 'build')}/server/*.assets.json`,
        `${path.join(PRJ_DIR, 'build')}/server/*.loadable.json`
    ];

    for (const pattern of patterns) {
        const sync = glob.sync(pattern);

        for (const filePath of sync) {
            const bundleName = filePath.split('/').pop()?.split('.').shift();
            const entityName = filePath.split('/').pop()?.split('.')[1];

            if (bundleName && entityName) {
                bundles[bundleName] = bundles[bundleName] || {};

                bundles[bundleName][entityName] = /.js$/.test(filePath) ?
                    // eslint-disable-next-line @typescript-eslint/no-var-requires
                    require(/* webpackIgnore: true */filePath).default :
                    require(/* webpackIgnore: true */filePath);
            }
        }
    }

    return bundles;
};

export default getBundles;
