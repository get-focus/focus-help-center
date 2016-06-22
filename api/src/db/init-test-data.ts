import {sequelize, Article} from './';

export const article1 = {id: 1, title: 'First', description: 'This is the third (is it?)', content: 'Blablabla is the base', published: true, publishedAt: new Date().toISOString()};
export const article2 = {id: 2, title: 'Second', description: 'This is the second', content: 'Blablabla is the base : 2', published: true, publishedAt: new Date().toISOString()};
export const article3 = {id: 3, title: 'Third', description: 'This is the first (is it?)', content: 'Blablabla is the base : 3', published: false};

/** Create the database. */
export async function initDb() {

    await sequelize.sync({ force: true });

    // Populate the database with fake data.
    await Article.create(article1);
    await Article.create(article2);
    await Article.create(article3);
}
