import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import path from 'path';
import 'core/logging';
import mv from './middleware';

const app = express();

const { PRJ_DIR = '', NODE_PORT = 8081, } = process.env;

app.use(bodyParser.json());
app.use(cookieParser());

app.use('/build/assets/', express.static(path.join(PRJ_DIR, 'build', 'assets')));
app.use(mv.router);
app.use(mv.bundle);
app.use(mv.router);
app.use(mv.render);

app.listen(NODE_PORT);
