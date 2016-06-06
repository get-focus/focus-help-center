import {sequelize, Article} from './index';

/** Create the database. */
export async function initDb() {

    // Creates the file.
    try {
        await sequelize.authenticate();
        console.log('Connection to the database successful.')
    } catch (error) {
        console.log(`Error while trying to connect to the database: ${error}`)
    }

    // Syncs the model
    try {
        await sequelize.sync({ force: true });
        console.log('Database sync sucessful');
    } catch (error) {
        console.log(`Error while trying to sync the model with the database : ${error}`);
    }

    //Populate the database with fake datas
    try {
        await Article.create({ title: 'The First', description: 'The first description', content: 'Blablabla is the base' });
        await Article.create({ title: 'The Second', description: 'The second description', content: 'Blablabla is the base : 2' });
        await Article.create({ title: 'The Third', description: 'The third description', content: 'Blablabla is the base : 32' });
        console.log('INITIALIZATION : SUCCESS');
    } catch (error) {
        console.log(`Error while trying to insert an article in the database : ${error}`);
    }
}