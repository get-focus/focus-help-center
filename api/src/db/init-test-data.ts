import {sequelize, Article} from './index';

export const article1 = {id: 1, title: 'The First', description: 'The first description', content: 'Blablabla is the base' };
export const article2 = {id: 2, title: 'The Second', description: 'The second description', content: 'Blablabla is the base : 2' };
export const article3 = {id: 3, title: 'The Third', description: 'The third description', content: 'Blablabla is the base : 3' };

/** Create the database. */
export async function initDb() {

    await sequelize.sync({ force: true });

    //Populate the database with fake datas
    await Article.create(article1);
    await Article.create(article2);
    await Article.create(article3);
    console.log('INITIALIZATION : SUCCESS');
}