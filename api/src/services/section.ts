import express from 'express';
import {Section} from '../db';
import {ISection} from '../db/section';
import {or, and, fn, col} from 'sequelize';

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
     *       404:
     *         description: Section not found
     *         schema:
     *           $ref: '#/definitions/Error'
     */
    app.get('/api/section/:id', async (req, res) => {
        const section = await Section.findById(req.params.id);
        if (!section) {
            res.status(404);
            res.json({ error: 'This section doesn\'t exists' });
        } else {
            res.json(section);
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
     */
    app.get(/\/api\/section(\?filter=:filter)?/, async (req, res) => {
        let {filter} = req.query;
        const order = [fn('lower', col('name'))];
        if (filter) {
            const like = or({ name: { like: `%${filter}%` } });
            if (req.user && req.user.signedIn) {
                res.json(await Section.findAll({ where: [like], order }));
            }
        } else {
            console.log('Right here');
            if (req.user && req.user.signedIn) {
                console.log('Right there');
                res.json(await Section.findAll({ order }));
            }
        }
    });

    /**
     * @swagger
     * /api/section:
     *   post:
     *     tags:
     *       - Section
     *     description: Saves a section.
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
     *       403:
     *         description: No rights to save
     *         schema:
     *           $ref: '#/definitions/Error'
     */
    app.post('/api/section', async (req, res) => {
        if (!(req.user && req.user.signedIn)) {
            res.status(403);
            res.json({ error: 'Cannot save a section when not connected' });
        } else {
            let section: ISection = req.body;
            if (!section.id) {
                section = (await Section.create(req.body)).get();
            }
            res.json(section);
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
        } else {
            const deletedRows = await Section.destroy({ where: { id: req.params.id } });
            if (deletedRows === 1) {
                res.json({ success: true });
            } else {
                res.status(404);
                res.json({ error: `No section deleted` });
            }
        }
    });
}
