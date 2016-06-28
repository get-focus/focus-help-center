import express from 'express';
import {ArticleSection} from '../db';
import {IArticleSection} from '../db/article-section';
import {or, fn, col} from 'sequelize';

/**
 * @swagger
 * definition:
 *   ArticleSection-Get:
 *     properties:
 *       ArticleId:
 *         type: integer
 *       SectionId:
 *         type: integer
 */

/**
 * @swagger
 * definition:
 *   ArticleSection-Post:
 *     properties:
 *       ArticleId:
 *         type: integer
 *       SectionId:
 *         type: integer
 */

/**
 * @swagger
 * definition:
 *   Success:
 *     properties:
 *       success:
 *         type: boolean
 */

/**
 * @swagger
 * definition:
 *   Error:
 *     properties:
 *       error:
 *         type: string
 */

export function articleSectionService(app: express.Application) {

    /**
     * @swagger
     * /api/article_section:
     *   post:
     *     tags:
     *       - ArticleSection
     *     description: Saves or update an ArticleSection.
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: ArticleSection
     *         description: The sectop, to save.
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/ArticleSection-Post'
     *     responses:
     *       200:
     *         description: The saved ArticleSection with its id.
     *         schema:
     *           $ref: '#/definitions/ArticleSection-Get'
     *       400:
     *         description: Bad Request
     *         schema:
     *           $ref: '#/definitions/Error'
     *       403:
     *         description: No rights to save
     *         schema:
     *           $ref: '#/definitions/Error'
     */
    app.post('/api/article_section', async (req, res) => {
        let articleSection: IArticleSection = req.body;
        articleSection = (await ArticleSection.create(req.body)).get();
        res.json(articleSection);
    });

    /**
     * @swagger
     * /api/article_section/{ArticleId}/{SectionId}:
     *   delete:
     *     tags:
     *       - ArticleSection
     *     description: Deletes an ArticleSection.
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: ArticleId
     *         description: Id of the ArticleSection to delete.
     *         in: path
     *         required: true
     *         type: integer
     *       - name: SectionId
     *         description: Id of the ArticleSection to delete.
     *         in: path
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: Success message
     *         schema:
     *           $ref: '#/definitions/Success'
     *       400:
     *         description: Bad Request
     *         schema:
     *           $ref: '#/definitions/Error'
     *       403:
     *         description: No rights to delete
     *         schema:
     *           $ref: '#/definitions/Error'
     *       404:
     *         description: Can't find the ArticleSection
     *         schema:
     *           $ref: '#/definitions/Error'
     */
    app.delete(`/api/article_section/:ArticleId/:SectionId`, async (req, res) => {
        const deletedRows = await ArticleSection.destroy({ where: { ArticleId: req.params.ArticleId, SectionId: req.params.SectionId } });
        if (deletedRows === 1) {
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    });

    /**
     * @swagger
     * /api/article_section/{ArticleId}/{SectionId}:
     *   get:
     *     tags:
     *       - ArticleSection
     *     description: Returns an ArticleSection.
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: ArticleId
     *         description: Id of the ArticleSection to delete.
     *         in: path
     *         required: true
     *         type: integer
     *       - name: SectionId
     *         description: Id of the ArticleSection to delete.
     *         in: path
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: A single ArticleSection.
     *         schema:
     *           $ref: '#/definitions/ArticleSection-Get'
     *       400:
     *         description: Bad Request
     *         schema:
     *           $ref: '#/definitions/Error'
     *       403:
     *         description: Bad Request
     *         schema:
     *           $ref: '#/definitions/Error'
     *       404:
     *         description: ArticleSection not found
     *         schema:
     *           $ref: '#/definitions/Error'
     */
    app.get(`/api/article_section/:ArticleId/:SectionId`, async (req, res) => {
        res.json({'hello': 'test'});
    });
}
