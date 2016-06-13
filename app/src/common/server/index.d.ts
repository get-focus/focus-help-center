import {Article} from '../definitions/article';

/** Api interface, to abstract away the actual implementation in actions. */
export interface Api {

    /** Loads all the articles */
    loadArticleList: () => Promise<Article[]>;

    /** Logs in on the server */
    login: (password: string) => Promise<boolean | string>;

    /** Queries the server to know if the user is connected or not. */
    isConnected: () => Promise<boolean>;

    /** Saves an article */
    saveArticle: (article: Article) => Promise<boolean | string>;

    /** Deletes an article. */
    deleteArticle: (id: number) => Promise<boolean | string>;
}
