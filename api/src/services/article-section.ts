import express from 'express';
import {ArticleSection} from '../db';

export function articleSectionService(prefix: string, app: express.Application) {

    app.get(`${prefix}/api/association/:articleId/:sectionId`, async (req, res) => {
        const association = (await ArticleSection.find({ where: { ArticleId: req.params.articleId, SectionId: req.params.sectionId } }));

        if (!(req.user && req.user.signedIn)) {
            res.status(403);
            res.json({ error: 'Cannot search an association\'s list when not connected' })
        } else {
            if (!association) {
                res.status(404);
                res.json({ error: 'No association found' });
            } else if (req.user && req.user.signedIn) {
                res.json(association);
            }
        }

    });

    app.get(`${prefix}/api/association`, async (req, res) => {
        const associations = ((await ArticleSection.findAll()).map(association => association.get()));

        if (!(req.user && req.user.signedIn)) {
            res.status(403);
            res.json({ error: 'Cannot search an association\'s list when not connected' })
        } else {
            if (associations.length) {
                res.json(associations);
            } else {
                res.status(403);
                res.json({ error: 'There is no associations' });
            }
        }
    });
}
