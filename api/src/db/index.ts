import Sequelize from 'sequelize';
import {IArticle, IArticleInstance} from './article';
import {dbPath} from '../config';
import {ISection, ISectionInstance} from './section';

const sequelizeInstance =
    new Sequelize('articles', null, null, {
        dialect: 'sqlite',
        storage: process.env.DB_ENV !== 'test' ? dbPath : ':memory:',
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

const section = sequelizeInstance.define<ISectionInstance, ISection>('Section', {
    name: Sequelize.STRING
});

/** ORM instance. */
export const sequelize = sequelizeInstance;

/** Article definition, used to query the database. */
export const Article = article;

/** Section definition, used to query the database. */
export const Section = section;
