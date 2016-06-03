import {sequelize, Article} from './index';
var faker = require('faker');

/** Create the database. */
async function initDb() {

    // Creates the file.
    try {
        await sequelize.authenticate();
        console.log('Connection to the database successful.')
    } catch (error) {
        console.log(`Error while trying to connect to the database: ${error}`)
    }

    // Syncs the model
    try {
        await sequelize.sync({force: true});
        console.log('Database sync sucessful');
    } catch (error) {
        console.log(`Error while trying to sync the model with the database : ${error}`);
    }

    // Inserts an article, to replace with fake data.
    try {
        await Article.create({title: faker.random.word(), description: faker.lorem.sentence(), content: faker.lorem.sentences()});
    } catch (error) {
        console.log(`Error while trying to insert an article in the database : ${error}`);
    }

    //Populate the database with fake articles
    try {
        for(let i = 0; i < 10; i++) {
        await Article.create({title: faker.random.word(), description: faker.lorem.sentence(), content: faker.lorem.sentences()});
        }
    } catch (error) {
        console.log(`Error while trying to insert an article in the database : ${error}`);
    }
}

initDb();
