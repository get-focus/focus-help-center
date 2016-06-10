import express from 'express';
import {Article} from '../db/index';

export function articleSaveService(app: express.Application) {

    /** save service. */
    app.route('/save-article')
        .post((req, res) => {
            res.status(200);
            res.send('Data sent');
            addArticle(req.body);
            console.log(req.body);
        })
        .get((req, res) => {
            res.send(req.body);
            console.log(req.body);
        });
}

async function addArticle(article) {
    try {
        await Article.create(article);
        console.log('Article added with success');
        const test = Article.findAll();
        console.log(test);
    } catch (error) {
        console.log(`Error while trying to insert an article in the database : ${error}`);
    }
}
