import {Article} from '../definitions/article';
import {Section} from '../definitions/section';

/** Api interface, to abstract away the actual implementation in actions. */
export interface Api {

    /** Loads all the articles. */
    loadArticleList: (filter?: string) => Promise<Article[]>;

    /** Loads all the articles. */
    loadSectionList: () => Promise<Section[]>;

    /** Logs in on the server. */
    login: (password: string) => Promise<boolean>;

    /** Queries the server to know if the user is connected or not. */
    isConnected: () => Promise<{connected: boolean, userName?: string}>;

    /** Saves an article. */
    saveArticle: (article: Article) => Promise<Article>;

    /** Manages an article-sections' associations. */
    manageArticleSection: (articleId, sections: Section[]) => Promise<{articleId: number, sections: Section[]}>;

    /** Deletes an article. */
    deleteArticle: (id: number) => Promise<boolean>;

    /** Loads an article. */
    getArticle: (id: number) => Promise<Article>;

    getSectionArticles: (id: number) => Promise<Article[]>;

    getSection: (id: number) => Promise<Section>;
}
