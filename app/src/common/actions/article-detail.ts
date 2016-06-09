import {Action} from './';
import {Article} from '../definitions/article';
import {ArticleDetailAction} from '../definitions/article-detail';

/** Action creator to update article in store. */
export function updateArticle(article: Article): ArticleDetailAction {
    return {
        type: Action.REQUEST_ARTICLE_LIST,
        article
    };
}
