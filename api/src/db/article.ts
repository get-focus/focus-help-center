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
    sectionList?: ISection[];
}

/** Represents the article instance for the ORM (ie the object returned by queries) */
export interface IArticleInstance extends Sequelize.Instance<{}, IArticle> { }
