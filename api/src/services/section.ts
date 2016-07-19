import express from 'express';
import {Article, Section, ArticleSection} from '../db';
import {fn, col} from 'sequelize';

export function sectionService(prefix: string, app: express.Application) {

    app.get(`${prefix}/api/section/:id`, async (req, res) => {
        const section = (await Section.findById(req.params.id));

        if (!(req.user && req.user.signedIn)) {
            res.status(403);
            res.json({ error: 'Cannot search a section when not connected' });
        } else {
            if (!section) {
                res.status(404);
                res.json({ error: 'No section found' });
            } else {
                res.json(section.get());
            }
        }
    });

    app.get(`${prefix}/api/section/:id/articles`, async (req, res) => {
        if (!(req.user && req.user.signedIn)) {
            res.status(403);
            res.json({ error: 'Cannot search sections when not connected' });
        } else {
            try {
                const articleIDs = (await ArticleSection.findAll({ where: { SectionId: +req.params.id }})).map(association => association.get().ArticleId);
                let articleList = [];
                for (let i = 0; i < articleIDs.length; i++) {
                    articleList.push(await Article.findById(articleIDs[i]));
                }
                res.json(articleList);
            } catch (e) {
                res.json({ error: e });
            }
        }
    });

    app.get(`${prefix}/api/section`, async (req, res) => {
        const order = [fn('lower', col('name'))];
        const sections = ((await Section.findAll({order})).map(section => section.get()));

        if (!(req.user && req.user.signedIn)) {
            res.status(403);
            res.json({ error: 'Cannot search sections when not connected' });
        } else {
            if (sections.length > 0 && req.user && req.user.signedIn) {
                res.json(sections);
            } else {
                res.status(404);
                res.json({ error: 'There is no section' });
            }
        }
    });
}
