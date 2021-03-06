import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';

/** Config for swagger-jsdoc, which generates a swagger.json file from the service docs. */
const swaggerSpec = swaggerJSDoc({
    swaggerDefinition: {
    info: {
        title: 'Focus Help Center API',
        version: '1.0.0',
        description: 'API for the Focus help center',
    },
    host: 'localhost:1337',
    basePath: '/',
},
    apis: ['./services/*.js'],
});

export function swaggerService(prefix: string, app: express.Application) {

    /** Serves the swagger.json file. */
    app.get(`${prefix}/swagger.json`, (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
}
