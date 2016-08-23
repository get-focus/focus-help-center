import express from 'express';
import {Article, Section, ArticleSection} from '../db';
import {fn, col} from 'sequelize';

export function sectionService(prefix: string, app: express.Application) {

    app.get(`${prefix}/api/section/:id`, async (req, res) => {
        try {
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
        } catch (e) {
            res.status(403);
            res.json({ error: e });
        }
    });

    app.get(`${prefix}/api/section/:id/articles`, async (req, res) => {
        try {
            const articleIDs = (await ArticleSection.findAll({ where: { SectionId: +req.params.id } })).map(association => association.get().ArticleId);
            let articleList = [];

            for (let i = 0; i < articleIDs.length; i++) {
                const article = (await Article.findById(articleIDs[i]));
                if (req.user && req.user.signedIn) {
                    articleList.push(article);
                } else if (!req.user && article.get().published) {
                    articleList.push(article);
                }
            }
            res.json(articleList);
        } catch (e) {
            res.json({ error: e });
        }
    });

    app.get(`${prefix}/api/section`, async (req, res) => {
        const order: any = [fn('lower', col('name'))];
        try {
            if (req.user && req.user.signedIn) {
                const sections = ((await Section.findAll({ order })).map(section => section.get()));
                res.json(sections);
            } else {
                const articles = ((await Article.findAll({ where: { published: true } })).map(article => article.get()));
                const sections = ((await Section.findAll({ order })).map(section => section.get()));

                const sectionAssociations = ((await ArticleSection.findAll()).map(association => association.get()));
                let sectionsArray = [];
                sectionAssociations.map(association =>
                    articles.map(article => {
                        if (article.id === association.ArticleId) {
                            sections.map(section => {
                                if (section.id === association.SectionId) {
                                    sectionsArray.push(section);
                                }
                            });
                        }
                    })
                );
                let sectionsToShow = Array.from(new Set(sectionsArray));
                res.json(sectionsToShow.sort((a, b) => { return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0); }));
            }
        } catch (e) {
            res.status(403);
            res.json({ error: e });
        }
    });
}
