import Sequelize from 'sequelize';

/** Represents an article. */
interface IArticle {
    title: string;
    description: string;
    content: string;
    createdAt?: string;
    updatedAt?: string;
}

/** Represents the article instance for the ORM (ie the object returned by queries) */
interface IArticleInstance extends Sequelize.Instance<{}, IArticle> { }
