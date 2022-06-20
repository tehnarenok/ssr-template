import express, { NextFunction, Request, Response } from 'express';
import path from 'path';

const staticMv = () => {
    const { PRJ_DIR = '', NODE_ENV = 'development', } = process.env;

    if (NODE_ENV === 'development') {
        return express.static(path.join(PRJ_DIR, 'build', 'assets'));
    }
    return (req: Request, res: Response, next: NextFunction) => {
        next();
    };
};

export default staticMv;
