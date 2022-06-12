const glob = require('glob');
const path = require('path');
const getClientConfig = require('./get-client-config');
const getServerConfig = require('./get-server-config');

/**
 * Получаем тип entry
 * @param {String} file Имя файла
 * @returns Тип entry
 */
const getEntryType = file => {
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

const getServerEntries = bundleSpecs => {
    if (bundleSpecs.app) {
        throw new Error("Don\'t use app as a bundleName, it was reserved for nodejs application");
    }

    const serverBundles = Object.keys(bundleSpecs);

    const entries = serverBundles.reduce((acc, bundleName) => {
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

/**
 * Получаем конфиги
 * @param {String} folder директория
 * @param {*} config конфиг
 * @param {*} configOverrides configOverrides
 */
const getBundlesSpecByFolder = (folder, config, configOverrides = {}) => {
    const files = glob.sync(`${folder}/**/@(client|server).@(ts|js)`);

    return files.reduce((spec, file) => {
        const bundleName = file
            .replace(folder, '')
            .split('/')
            .slice(1, -1)
            .join('-');

        spec[bundleName] = spec[bundleName] || {};
        spec[bundleName].name = bundleName;
        spec[bundleName].entries = spec[bundleName].entries || {};
        spec[bundleName].config = configOverrides[bundleName] ? configOverrides[bundleName] : config;
        spec[bundleName].entries[getEntryType(file)] = file;

        return spec;
    }, {});
};

const getBundleConfigs = (spec, config = {}) => {
    const bundles = Object.keys(spec);

    let configs = [];

    configs = configs.concat(bundles
        .filter(bundle => Boolean(spec[bundle].entries.client))
        .map(bundle => {
            const clientConfig = spec[bundle].config['pdf-printer'];

            if (clientConfig !== false) {
                return getClientConfig({
                    ...spec[bundle].config.client,
                    bundleName: bundle,
                    bundlePath: path.join(process.cwd(), spec[bundle].entries.client),
                });
            }
        })
    );

    if (config !== false) {
        configs.push(getServerConfig({
            entries: getServerEntries(spec),
            ...config,
        }));
    }

    return configs.filter(Boolean);
};

const getConfig = ({ folder, config = {}, configOverrides = {}, }) => {
    let spec = getBundlesSpecByFolder(folder, config, configOverrides);

    const { BUNDLE, } = process.env;

    if (BUNDLE) {
        const bundles = BUNDLE.split(',');

        const pickedSpec = {};

        bundles.forEach(bundleName => {
            if (spec[bundleName]) {
                pickedSpec[bundleName] = spec[bundleName];

                return;
            }

            throw Error(`Bundle ${bundleName} doesn't exit`);
        });

        spec = pickedSpec;
    }

    return getBundleConfigs(spec, config.server);
};

module.exports = getConfig;
