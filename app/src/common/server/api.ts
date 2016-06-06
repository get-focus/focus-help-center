import fetch from 'isomorphic-fetch';
import {Article} from '../definitions/article';
import {Api} from './index';

/** Api object to call the server. */
export const api: Api = {
    async loadArticleList() {
        const response = await fetch('http://localhost:3000/api/article');
        return response.json<Article[]>();
    }
};
