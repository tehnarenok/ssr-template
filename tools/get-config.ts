import glob from 'glob';
import { Configuration } from 'webpack';
import path from 'path';
import getClientConfig from './get-client-config';
import getServerConfig from './get-server-config';
import { IConfigProps, IConfigurationOverrides, IEntries, ISpec } from './types';

const getEntryType = (file: string) => {
    switch (true) {
        case /server\.(ts|js)$/.test(file): {
            return 'server';
        }

        case /client\.(ts|js)$/.test(file): {
            return 'client';
        }

        default: {
            throw new Error("Can\'t parse entry type from file, " +
                "available entry names must ending with: 'pdf-printer', 'server', 'client'"
            );
        }
    }
};

const getServerEntries = (bundleSpecs: ISpec) => {
    if (bundleSpecs.app) {
        throw new Error("Don\'t use app as a bundleName, it was reserved for nodejs application");
    }

    const serverBundles = Object.keys(bundleSpecs);

    let entries: IEntries = {};

    entries = serverBundles.reduce((acc: IEntries, bundleName) => {
        const serverEntry = bundleSpecs[bundleName].entries.server;

        if (serverEntry) {
            acc[`${bundleName}.server`] = path.join(process.cwd(), serverEntry);
        }

        return acc;
    }, {});

    const getServerAppPath = () => path.join(process.cwd(), 'app', 'index');

    entries.app = getServerAppPath();

    return entries;
};

const getBundlesSpecByFolder = (
    folder: string,
    config: IConfigProps,
    configOverrides: IConfigurationOverrides = {}
) => {
    const files = glob.sync(`${folder}/**/@(client|server).@(ts|js)`);

    return files.reduce((spec: ISpec, file: string) => {
        const bundleName = file
            .replace(folder, '')
            .split('/')
            .slice(1, -1)
            .join('-');

        spec[bundleName] = spec[bundleName] || {};
        spec[bundleName].name = bundleName;
        spec[bundleName].entries = spec[bundleName].entries || {};
        spec[bundleName].config = config;
        spec[bundleName].entries[getEntryType(file)] = file;
        spec[bundleName].configOverrides = configOverrides[bundleName];

        return spec;
    }, {});
};

const getBundleConfigs = (spec: ISpec, config: IConfigProps) => {
    const bundles = Object.keys(spec);

    let configs: (Configuration | undefined)[] = [];

    configs = configs.concat(
        bundles
            .filter(bundle => Boolean(spec[bundle].entries.client))
            .map(bundle => {
                const clientConfig = spec[bundle].config.client;

                if (clientConfig !== false) {
                    return getClientConfig({
                        ...spec[bundle].config.client,
                        bundleName: bundle,
                        bundlePath: path.join(process.cwd(), spec[bundle].entries.client),
                    });
                }

                return undefined;
            })
    );

    if (config !== false) {
        configs.push(getServerConfig({
            entries: getServerEntries(spec),
            ...config.server,
        }));
    }

    return configs.filter(Boolean);
};

const getConfig = (
    folder: string,
    config: IConfigProps,
    configOverrides: IConfigurationOverrides = {}
) => {
    let spec = getBundlesSpecByFolder(folder, config, configOverrides);

    const { BUNDLE, } = process.env;

    if (BUNDLE) {
        const bundles = BUNDLE.split(',');

        const pickedSpec: ISpec = {};

        bundles.forEach(bundleName => {
            if (spec[bundleName]) {
                pickedSpec[bundleName] = spec[bundleName];

                return;
            }

            throw Error(`Bundle ${bundleName} doesn't exit`);
        });

        spec = pickedSpec;
    }

    return getBundleConfigs(spec, config);
};

export default getConfig;
