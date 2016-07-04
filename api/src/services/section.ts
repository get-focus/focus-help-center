import express from 'express';
import {Section} from '../db';

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

    app.get(`${prefix}/api/section`, async (req, res) => {
        const sections = ((await Section.findAll()).map(section => section.get()));

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
