import Sequelize from 'sequelize';

/** Represents an article. */
export interface IArticle {
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
export interface IArticleInstance extends Sequelize.Instance<{}, IArticle> { }
