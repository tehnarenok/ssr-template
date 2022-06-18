import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import expressStaticGzip from 'express-static-gzip';
import path from 'path';
import 'core/logging';
import mv from './middleware';

const app = express();

const { PRJ_DIR = '', NODE_PORT = 3000, } = process.env;

app.use('/assets/', expressStaticGzip(
    path.join(PRJ_DIR, 'build', 'assets'),
    {
        enableBrotli: true,
        orderPreference: [ 'br', 'gz' ],
    }
));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(mv.router);
app.use(mv.bundle);
app.use(mv.router);
app.use(mv.render);

app.listen(NODE_PORT);
