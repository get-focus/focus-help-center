import app, {serveStatic, configService} from './';
import {initDb} from './db/init-test-data';
import expressJwt from 'express-jwt';

import {articleService} from './services/article';
import {sectionService} from './services/section';
import {signinService} from './services/signin';
import {swaggerService} from './swagger/index';

serveStatic('', app);
app.use(expressJwt({secret: 'secret', credentialsRequired: false}));

// When testing, we recreate the db for each request.
if (process.env.DB_ENV === 'test') {
    app.use(async (req, res, next) => {
        await initDb();
        next();
    });
}

articleService('', app);
configService('', app);
signinService('', app);
swaggerService('', app);

app.listen(1337, () => console.log('Launching app on port 1337.'));
