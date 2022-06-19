import { Request, Response, NextFunction } from 'express';
import getRoute from 'core/router';
import getBundles from 'app/getBundles';

const bundles = getBundles();

const render = (req: Request, res: Response, next: NextFunction) => {
    const query = Object.keys(req.query).reduce((obj: {[key: string]: string}, key: string) => {
        const k: string = key.toString();
        const value = req.query[k]?.toString();

        if (value && k) {
            obj[k] = value;
        }
        return obj;
    },
    {});

    const router = getRoute({
        path: req.path,
        query,
    });

    const pageBundle = req.bundle;

    if (!pageBundle) {
        throw new Error([
            'Cant found bundle for',
            req.path
        ].join('\n'));
    }

    const { server: render, assets, loadable, } = bundles[pageBundle];

    // eslint-disable-next-line prefer-const
    let bodyScripts: string[] = [];
    // eslint-disable-next-line prefer-const
    let stylesheets: string[] = [];

    for (const asset of Object.keys(assets)) {
        for (const key of Object.keys(assets[asset])) {
            switch (key) {
                case 'css': {
                    stylesheets.push((assets[asset][key]));
                    break;
                }
                case 'js': {
                    bodyScripts.push((assets[asset][key]));
                    break;
                }
                default: {
                    break;
                }
            }
        }
    }

    const html = render({
        bodyScripts: bodyScripts.map(script => ({ src: script, })),
        stylesheets: stylesheets.map(href => ({ href, })),
        router,
        loadable,
    });

    res.send(html);
    next();
};

export default render;
