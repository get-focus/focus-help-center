import Sequelize from 'sequelize';
import {ISection} from './section';

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
    sections?: ISection[];
    url?: string;
    informations?: string;
}

/** Represents the article instance for the ORM (ie the object returned by queries) */
export interface IArticleInstance extends Sequelize.Instance<IArticle> { }
