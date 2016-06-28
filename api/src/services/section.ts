import express from 'express';
import {Section} from '../db';
import {ISection} from '../db/section';
import {or, fn, col} from 'sequelize';

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
 *   Section-Post:
 *     properties:
 *       id:
 *         type: integer
 *       name:
 *         type: string
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

export function sectionService(app: express.Application) {

    /**
     * @swagger
     * /api/section/{id}:
     *   get:
     *     tags:
     *       - Section
     *     description: Returns a single section.
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Id of the section.
     *         in: path
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: A single section.
     *         schema:
     *           $ref: '#/definitions/Section-Get'
     *       400:
     *         description: Bad Request
     *         schema:
     *           $ref: '#/definitions/Error'
     *       403:
     *         description: Bad Request
     *         schema:
     *           $ref: '#/definitions/Error'
     *       404:
     *         description: Section not found
     *         schema:
     *           $ref: '#/definitions/Error'
     */
    app.get('/api/section/:id', async (req, res) => {
        const section = await Section.findById(req.params.id);

        if (!(req.user && req.user.signedIn)) {
            res.status(403);
            res.json({ error: 'You have to be connected' });
        }
        if (!section && req.user.signedIn) {
            res.status(404);
            res.json({ error: 'This section doesn\'t exists' });
        } else if (req.user && req.user.signedIn) {
            res.json(section);
        } else {
            res.status(400);
            res.json({ error: 'Unexpected error' });
        }
    });

    /**
     * @swagger
     * /api/section:
     *   get:
     *     tags:
     *       - Section
     *     description: Returns all the sections.
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: filter
     *         description: Optional filter by name.
     *         in: query
     *         required: false
     *         type: string
     *     responses:
     *       200:
     *         description: Returns all the sections.
     *         schema:
     *         type: array
     *         items:
     *             $ref: '#/definitions/Section-Get'
     *       400:
     *         description: Bad Request
     *         schema:
     *           $ref: '#/definitions/Error'
     *       403:
     *         description: No rights to search
     *         schema:
     *           $ref: '#/definitions/Error'
     */
    app.get(/\/api\/section(\?filter=:filter)?/, async (req, res) => {
        let {filter} = req.query;
        const order = [fn('lower', col('name'))];
        if (req.user && req.user.signedIn) {
            if (filter) {
                const like = or({ name: { like: `%${filter}%` } });
                res.json(await Section.findAll({ where: [like], order }));
            } else {
                res.json(await Section.findAll({ order }));
            }
        } else if (!(req.user && req.user.signedIn)) {
            res.status(403);
            res.json({ error: 'Cannot search a section when not connected' });
        } else {
            res.status(400);
            res.json({ error: 'Unexpected error' });
        }
    });

    /**
     * @swagger
     * /api/section:
     *   post:
     *     tags:
     *       - Section
     *     description: Saves or update a section.
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: section
     *         description: The sectop, to save.
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/Section-Post'
     *     responses:
     *       200:
     *         description: The saved section with its id.
     *         schema:
     *           $ref: '#/definitions/Section-Get'
     *       400:
     *         description: Bad Request
     *         schema:
     *           $ref: '#/definitions/Error'
     *       403:
     *         description: No rights to save
     *         schema:
     *           $ref: '#/definitions/Error'
     */
    app.post('/api/section', async (req, res) => {
        if (!(req.user && req.user.signedIn)) {
            res.status(403);
            res.json({ error: 'Cannot save a section when not connected' });
        } else if (req.user && req.user.signedIn) {
            let section: ISection = req.body;
            if (!section.id) {
                section = (await Section.create(req.body)).get();
            } else {
                await Section.update(section, { where: { id: req.body.id } });
            }
            res.json(section);
        } else {
            res.status(400);
            res.json({ error: 'Unexpected error' });
        }
    });

    /**
     * @swagger
     * /api/section/{id}:
     *   delete:
     *     tags:
     *       - Section
     *     description: Deletes a section.
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Id of the section to delete.
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
     *         description: Can't find the section
     *         schema:
     *           $ref: '#/definitions/Error'
     */
    app.delete('/api/section/:id', async (req, res) => {
        if (!(req.user && req.user.signedIn)) {
            res.status(403);
            res.json({ error: 'Cannot delete a section when not connected' });
        } else if (req.user && req.user.signedIn) {
            const deletedRows = await Section.destroy({ where: { id: req.params.id } });
            if (deletedRows === 1) {
                res.json({ success: true });
            } else {
                res.status(404);
                res.json({ error: `No section deleted` });
            }
        } else {
            res.status(404);
            res.json({ error: `Unexpected error` });
        }
    });
}
