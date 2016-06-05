import fetch from 'isomorphic-fetch';
import {Article} from '../definitions/article';

export const api = {
    async loadArticleList() {
        const response = await fetch('http://localhost:3000/api/article');
        return response.json<Article[]>();
    }
}