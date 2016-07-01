import express from 'express';
import {sequelize, Article, ArticleSection, Section} from '../db';
import {IArticle} from '../db/article';
import {ISection} from '../db/section';
import {IArticleSection} from '../db/article-section';
import {or, and, fn, col} from 'sequelize';

/**
 * @swagger
 * definition:
 *   Article-Get:
 *     properties:
 *       id:
 *         type: integer
 *       title:
 *         type: string
 *       description:
 *         type: string
 *       content:
 *         type: string
 *       published:
 *         type: boolean
 *       createdAt:
 *         type: string
 *       updatedAt:
 *         type: string
 *       publishedAt:
 *         type: string
 */

/**
 * @swagger
 * definition:
 *   Section-Get:
 *     properties:
 *       id:
 *         type: integer
 *       name:
 *         type: string
 */

/**
 * @swagger
 * definition:
 *   Sections-Get:
 *     properties:
 *       List:
 *         type: array
 *         items:
 *           $ref: '#/definitions/Section-Get'
 */

/**
 * @swagger
 * definition:
 *   ArticleWithSections-Get:
 *     properties:
 *       id:
 *         type: integer
 *       title:
 *         type: string
 *       description:
 *         type: string
 *       content:
 *         type: string
 *       published:
 *         type: boolean
 *       createdAt:
 *         type: string
 *       updatedAt:
 *         type: string
 *       publishedAt:
 *         type: string
 *       sections:
 *         type: array
 *         items:
 *           $ref: '#/definitions/Section-Get'
 */

/**
 * @swagger
 * definition:
 *   ArticleIdSectionList-Get:
 *     properties:
 *       articleId:
 *         type: integer
 *       sections:
 *         type: array
 *         items:
 *           $ref: '#/definitions/Section-Get'
 */

/**
 * @swagger
 * definition:
 *   Article-Post:
 *     properties:
 *       id:
 *         type: integer
 *       title:
 *         type: string
 *       description:
 *         type: string
 *       content:
 *         type: string
 *       published:
 *         type: boolean
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

export function articleService(prefix: string, app: express.Application) {

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
     *           $ref: '#/definitions/ArticleWithSections-Get'
     *       403:
     *         description: Article not published and no rights
     *         schema:
     *           $ref: '#/definitions/Error'
     *       404:
     *         description: Article not found
     *         schema:
     *           $ref: '#/definitions/Error'
     */
    app.get(`${prefix}/api/article/:id`, async (req, res) => {
        const article = (await Article.findById(req.params.id));
        if (!article) {
            res.status(404);
            res.json({ error: 'No article found' });
        } else if (req.user && req.user.signedIn || article.get().published === true) {
            const articleSection = (await ArticleSection.findAll({where: {ArticleId: article.get().id}})).map(article => article.get());
            let sectionList: ISection[] = [];
            for (let i = 0; i < articleSection.length; i++) {
                sectionList.push((await Section.findById(articleSection[i].SectionId)).get());
            }
            article.get().sections = sectionList;
            res.json(article);
        } else {
            res.status(403);
            res.json({ error: 'This article isn\'t published' });
        }
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
     *       - name: filter
     *         description: Optional filter by title or description.
     *         in: query
     *         required: false
     *         type: string
     *     responses:
     *       200:
     *         description: Returns all the articles.
     *         schema:
     *         type: array
     *         items:
     *             $ref: '#/definitions/Article-Get'
     */
    app.get(/\/api\/article(\?filter=:filter)?/, async (req, res) => {
        let {filter} = req.query;
        const order = [fn('lower', col('title')), fn('lower', col('description'))];
        if (filter) {
            const like = or({ title: { like: `%${filter}%` } }, { description: { like: `%${filter}%` } });
            if (req.user && req.user.signedIn) {
                res.json(await Article.findAll({ where: [like], order }));
            } else {
                res.json(await Article.findAll({ where: [and({ published: true }, like)], order }));
            }
        } else {
            if (req.user && req.user.signedIn) {
                res.json(await Article.findAll({ order }));
            } else {
                res.json(await Article.findAll({ where: { published: true }, order }));
            }
        }
    });

    /**
     * @swagger
     * /api/article:
     *   post:
     *     tags:
     *       - Article
     *     description: Saves an article.
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: article
     *         description: The article to save.
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/Article-Post'
     *     responses:
     *       200:
     *         description: The saved article with its id.
     *         schema:
     *           $ref: '#/definitions/Article-Get'
     *       403:
     *         description: No rights to save
     *         schema:
     *           $ref: '#/definitions/Error'
     */
    app.post(`${prefix}/api/article`, async (req, res) => {
        if (!(req.user && req.user.signedIn)) {
            res.status(403);
            res.json({ error: 'Cannot save an article when not connected' });
        } else {
            let article: IArticle = req.body;
            if (!article.id) {
                article.published = article.published !== undefined ? article.published : false;
                article = (await Article.create(req.body)).get();
            } else {
                const time = new Date().toISOString();
                const dbArticle = (await Article.findById(article.id)).get();
                if (!dbArticle.published && article.published) {
                    article.publishedAt = time;
                } else if (!article.published) {
                    article.publishedAt = undefined;
                }
                await Article.update(article, { where: { id: req.body.id } });
                article.updatedAt = time;
            }
            res.json(article);
        }
    });

    /**
     * @swagger
     * /api/article/{id}/sections:
     *   post:
     *     tags:
     *       - Article
     *     description: Manage the article-section associations.
     *     produces:
     *       - application/json
      *     parameters:
     *       - name: id
     *         description: Article's id.
     *         in: path
     *         required: true
     *         type: integer
     *       - name: section
     *         description: The section list.
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/Sections-Get'
     *     responses:
     *       200:
     *         description: The managed article's id.
     *         schema:
     *           $ref: '#/definitions/ArticleIdSectionList-Get'
     *       500:
     *         description: Internal Server Error
     *         schema:
     *           $ref: '#/definitions/Error'
     *       400:
     *         description: Bad Request
     *         schema:
     *           $ref: '#/definitions/Error'
     *       403:
     *         description: No rights to save
     *         schema:
     *           $ref: '#/definitions/Error'
     */
    app.post('/api/article/:id/sections', async (req, res) => {
        try {
            let sections: ISection[] = req.body.List;
            let article = (await Article.findById(req.params.id)).get();
            ArticleSection.destroy({ where: { ArticleId: article.id } });
            if (sections && sections.length > 0) {
                for (let i = 0; i < sections.length; i++) {
                    if (sections[i].id === undefined) {
                        sections[i] = (await Section.create({ name: sections[i].name })).get();
                    }
                    try {
                        await ArticleSection.create({ ArticleId: article.id, SectionId: sections[i].id });
                    } catch (e) {
                        res.status(400);
                        res.json({ error: `Bad request : ${e}` });
                    }
                }
            }
            sequelize.query('delete from Sections where id not in (select distinct SectionId from ArticleSections)');
            res.json({ articleId: article.id, sections });
        } catch (e) {
            res.status(500);
            res.json({ error: `Internal Server Error : ${e}` });
        }
    });

    /**
     * @swagger
     * /api/article/{id}:
     *   delete:
     *     tags:
     *       - Article
     *     description: Deletes an article.
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Id of the article to delete.
     *         in: path
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: Success message
     *         schema:
     *           $ref: '#/definitions/Success'
     *       403:
     *         description: No rights to delete
     *         schema:
     *           $ref: '#/definitions/Error'
     *       404:
     *         description: Can't find the article
     *         schema:
     *           $ref: '#/definitions/Error'
     */
    app.delete(`${prefix}/api/article/:id`, async (req, res) => {
        if (!(req.user && req.user.signedIn)) {
            res.status(403);
            res.json({ error: 'Cannot delete an article when not connected' });
        } else {
            const deletedRows = await Article.destroy({ where: { id: req.params.id } });
            if (deletedRows === 1) {
                res.json({ success: true });
            } else {
                res.status(404);
                res.json({ error: `No article deleted` });
            }
        }
    });
}
