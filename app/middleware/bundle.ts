import { NextFunction, Request, Response } from 'express';

const bundle = (req: Request, res: Response, next: NextFunction) => {
    // req.bundle = 'index';
    next();
};

export default bundle;
