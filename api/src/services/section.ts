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
    });

    app.get(`${prefix}/api/section`, async (req, res) => {
        const order = [fn('lower', col('name'))];
        if (req.user && req.user.signedIn) {
            const sections = ((await Section.findAll({order})).map(section => section.get()));
            res.json(sections);
        } else {
            const articles = ((await Article.findAll({where: {published: true}})).map(article => article.get()));
            const sections = ((await Section.findAll({order})).map(section => section.get()));

            const sectionAssociations = ((await ArticleSection.findAll()).map(association => association.get()));
            let sectionsToShow = [];
            for (let i = 0; i < sectionAssociations.length; i++) {
                for (let j = 0; j < articles.length; j++) {
                    if (sectionAssociations[i].ArticleId === articles[j].id) {
                        for (let k = 0; k < sections.length; k++) {
                            if (sections[k].id === sectionAssociations[i].SectionId) {
                                sectionsToShow.push(sections[k]);
                            }
                        }
                    }
                }
            }
            res.json(sectionsToShow.sort((a, b) => {return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0); }););
        }
    });
}
