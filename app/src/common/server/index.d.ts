import {Article} from '../definitions/article';

/** Api interface, to abstract away the actual implementation in actions. */
export interface Api {

    /** Loads all the articles */
    loadArticleList: () => Promise<Article[]>;
}
