import Sequelize from 'sequelize';

/** Represents an article. */
interface IArticle {
    id?: number;
    title: string;
    description: string;
    content?: string;
    published: boolean;
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string;
}

/** Represents the article instance for the ORM (ie the object returned by queries) */
interface IArticleInstance extends Sequelize.Instance<{}, IArticle> { }
