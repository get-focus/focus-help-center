import express from 'express';
import {sequelize, Article} from '../db/index';
import {IArticle} from '../db/article';

export function articleUpdateService(app: express.Application) {

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
// Creates the file.
    try {
        await sequelize.authenticate();
        console.log('Connection to the database successful.');
    } catch (error) {
        console.log(`Error while trying to connect to the database: ${error}`);
    }

    // Populate the database with fake data
    try {
        await Article.create(article);
        console.log('Article added with success');
    } catch (error) {
        console.log(`Error while trying to insert an article in the database : ${error}`);
    }
}
