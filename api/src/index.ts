import express from 'express';
import {Article} from './db/index';

const app = express();

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.listen(3000, () => {
    console.log('Lauching app on port 3000');
    Article.find().then(article => console.log('Article in the database :', article.get()));
});
