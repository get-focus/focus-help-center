import express from 'express';
import cookieSession from 'cookie-session';
import bodyParser from 'body-parser';
import path from 'path';

import {articleService} from './services/article';
import {signinService} from './services/signin';
import {swaggerService} from './swagger';

import {initDb} from './db/init-test-data';

const app = express();
app.use(express.static(path.resolve(process.cwd(), '../docs')));
app.use(cookieSession({name: 'session', secret: 'secret'}));
app.use(bodyParser.text());
app.use(bodyParser.json());

// Allow CORS.
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Registers the services.
articleService(app);
signinService(app);
swaggerService(app);

app.listen(3000, () => {
    console.log('Lauching app on port 3000');
    if (process.env.DB_ENV === 'test') {
        console.log('Lauching the DB TEST INIT');
        initDb();
    }
});
