import express from 'express';
import {articleService} from './services/article';
import {swaggerService} from './swagger/index';

const app = express();

// Registers the services.
articleService(app);
swaggerService(app);

app.get('/', (req, res) => {
    res.send('Bienvenue sur le centre d\'aide Focus');
});

app.listen(3000, () => {
    console.log('Lauching app on port 3000');
});
