import Sequelize from 'sequelize';
import {IArticle, IArticleInstance} from './article';
import {join} from 'path';
import {dbPath} from '../config';
import {ISection, ISectionInstance} from './section';
import {IArticleSection, IArticleSectionInstance} from './article-section';

const sequelizeInstance =
    new Sequelize('articles', null, null, {
        dialect: 'sqlite',
        storage: process.env.DB_ENV !== 'test' ? dbPath : join(__dirname, './db-tests.sqlite'),
        port: 3306,
        logging: false
    });

const articleSection = sequelizeInstance.define<IArticleSectionInstance, IArticleSection>('ArticleSection', {}, {timestamps: false});

const article = sequelizeInstance.define<IArticleInstance, IArticle>('Article',
    {
        title: Sequelize.STRING,
        description: Sequelize.STRING,
        content: Sequelize.STRING,
        published: Sequelize.BOOLEAN,
        publishedAt: Sequelize.DATE
    }
);

const section = sequelizeInstance.define<ISectionInstance, ISection>('Section',
    {
        name: Sequelize.STRING
    },
    {
        timestamps: false,
    }
);

article.belongsToMany(section, {through: articleSection});
section.belongsToMany(article, {through: articleSection});

/** ORM instance. */
export const sequelize = sequelizeInstance;

/** Article definition, used to query the database. */
export const Article = article;

/** Section definition, used to query the database. */
export const Section = section;

/** ArticleSection definition, used to query the database. */
export const ArticleSection = articleSection;
