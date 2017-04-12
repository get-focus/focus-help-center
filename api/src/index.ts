import express, {Express} from 'express';
import bodyParser from 'body-parser';
import {resolve} from 'path';
import {accentColor, appUrl, backOfficeUrl, primaryColor, primaryColorDark, primaryColorLight} from './config';

const app: Express = express();
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Allow CORS.
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

export function serveStatic(prefix: string, app: Express) {
    app.use(prefix, express.static(resolve(__dirname, process.env.IS_BUNDLE ? './app' : './docs')));
}

export function configService(prefix: string, app: Express) {
    const confExport = {
        accentColor, appUrl, backOfficeUrl, primaryColor, primaryColorDark, primaryColorLight
    };
    app.get(`${prefix}/config`, (req, res) => res.json(confExport));
}

export default app;
