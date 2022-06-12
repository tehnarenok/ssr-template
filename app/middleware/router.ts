import { Request, Response, NextFunction } from 'express';
import getRoute from '../../core/router';

const router = (req: Request, res: Response, next: NextFunction) => {
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

    req.bundle = router.bundleName;

    next();
};

export default router;
