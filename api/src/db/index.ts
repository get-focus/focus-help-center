import Sequelize from 'sequelize';
import {IArticle, IArticleInstance} from './article';

const sequelizeInstance =
    new Sequelize('articles', null, null, {
        dialect: 'sqlite',
        storage: './db/db.sqlite',
        port: 3306,
        logging: false
    });

const article =
    sequelizeInstance.define<IArticleInstance, IArticle>('Article', {
        title: Sequelize.STRING,
        description: Sequelize.STRING,
        content: Sequelize.STRING
    });

/** ORM instance. */
export const sequelize = sequelizeInstance;

/** Article definition, used to query the database. */
export const Article = article;
