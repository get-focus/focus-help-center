import Sequelize from 'sequelize';
import {IArticle, IArticleInstance} from './article';
import {join} from 'path';

const sequelizeInstance =
    new Sequelize('articles', null, null, {
        dialect: 'sqlite',
        storage: process.env.DB_ENV !== 'test' ? join(__dirname, './db.sqlite') : ':memory:',
        port: 3306,
        logging: false
    });

const article =
    sequelizeInstance.define<IArticleInstance, IArticle>('Article', {
        title: Sequelize.STRING,
        description: Sequelize.STRING,
        content: Sequelize.STRING,
        published: Sequelize.BOOLEAN,
        publishedAt: Sequelize.DATE
    });

/** ORM instance. */
export const sequelize = sequelizeInstance;

/** Article definition, used to query the database. */
export const Article = article;
