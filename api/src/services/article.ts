import express from 'express';
import {Article} from '../db/index';

/**
 * @swagger
 * definition:
 *   Article:
 *     properties:
 *       id:
 *         type: integer
 *       title:
 *         type: string
 *       description:
 *         type: string
 *       content:
 *         type: string
 *       createdAt:
 *         type: string
 *       updatedAt:
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
        res.json(await Article.findById(req.params.id));
    });

    /**
     * @swagger
     * /api/article:
     *   get:
     *     tags:
     *       - Article
     *     description: Returns all the articles.
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: none
     *         description: none.
     *         in: path
     *         required: true
     *         type: any
     *     responses:
     *       200:
     *         description: Returns all the articles.
     *         schema:
     *         type: array
     *         items:
     *             $ref: '#/definitions/Article'
     */
    app.get('/api/article', async (req, res) => {
        res.json(await Article.findAll());
    });
}
