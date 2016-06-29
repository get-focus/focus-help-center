import express, {Express} from 'express';
import bodyParser from 'body-parser';
import {resolve} from 'path';

const app: Express = express();
app.use(bodyParser.text());
app.use(bodyParser.json());

// Allow CORS.
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

export function serveStatic(app: Express) {
    app.use(express.static(resolve(__dirname, process.env.IS_BUNDLE ? './app' : './docs')));
}

export default app;
