import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import 'core/logging';
import mv from './middleware';

const app = express();

const { NODE_PORT = 3000, } = process.env;

app.use('/assets/', mv.static());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(mv.router());
app.use(mv.bundle());
app.use(mv.router());
app.use(mv.render());

app.listen(NODE_PORT);
