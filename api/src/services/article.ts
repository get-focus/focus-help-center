import express from 'express';
import {Article} from '../db/index';

/**
 * @swagger
 * definition:
 *   Article:
 *     properties:
 *       title:
 *         type: string
 *       description:
 *         type: string
 *       content:
 *         type: string
 */

export function articleService(app: express.Application) {

    /**
     * @swagger
     * /api/article/{id}:
     *   get:
     *     tags:
     *       - Article
     *     description: Returns a single article.
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Id of the article.
     *         in: path
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: A single article.
     *         schema:
     *           $ref: '#/definitions/Article'
     */
    app.get('/api/article/:id', async (req, res) => {
        res.json(await Article.find({where: {id: req.param('id')}}));
    });
}
