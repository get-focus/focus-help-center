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
            res.json({error: 'This section doesn\'t exists'});
        } else {
            res.json(section);
        }
    });
}
