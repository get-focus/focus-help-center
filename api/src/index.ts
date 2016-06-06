import express from 'express';
import {articleService} from './services/article';
import {swaggerService} from './swagger/index';
import path from 'path';
import {initDb} from './db/init-test-data';

const app = express();
app.use(express.static(path.resolve(process.cwd(), '../docs')));

// Registers the services.
articleService(app);
swaggerService(app);

app.listen(3000, () => {
    console.log('Lauching app on port 3000');
    if(process.env.DB_ENV === 'test') {
        console.log('Lauching the DB TEST INIT');
        initDb();
    }
});
