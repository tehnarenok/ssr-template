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
        const err = new Error([
            'Cant found bundle for',
            req.path
        ].join('\n'));

        res.status(500).send(err.message.toString());

        throw err;
    }

    const { server: render, loadable, } = bundles[pageBundle];

    const html = render({
        router,
        loadable,
    });

    res.send(html);
    next();
};

export default render;
