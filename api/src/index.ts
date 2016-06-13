import express from 'express';
import expressJwt from 'express-jwt';
import bodyParser from 'body-parser';
import path from 'path';

import {articleService} from './services/article';
import {signinService} from './services/signin';
import {swaggerService} from './swagger/index';

import {initDb} from './db/init-test-data';

const app = express();
app.use(express.static(path.resolve(process.cwd(), process.env.IS_BUNDLE ? './app' : '../docs')));
app.use(expressJwt({secret: 'secret', credentialsRequired: false}));
app.use(bodyParser.text());
app.use(bodyParser.json());

// Allow CORS.
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
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
