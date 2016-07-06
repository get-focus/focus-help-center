import express, {Express} from 'express';
import bodyParser from 'body-parser';
import {resolve} from 'path';
import * as config from './config';

const app: Express = express();
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Allow CORS.
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

export function serveStatic(prefix: string, app: Express) {
    app.use(prefix, express.static(resolve(__dirname, process.env.IS_BUNDLE ? './app' : './docs')));
}

export function configService(prefix: string, app: Express) {
    app.get(`${prefix}/config`, (req, res) => res.json(config));
}

export default app;
