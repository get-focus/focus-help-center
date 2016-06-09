import fetch from 'isomorphic-fetch';
import {Article} from '../definitions/article';
import {Api} from './index';

/** Api object to call the server. */
export const api: Api = {
    async loadArticleList() {
        const response = await fetch('http://localhost:3000/api/article');
        return response.json<Article[]>();
    },

    async login(password: string) {
        const response = await fetch('http://localhost:3000/signin', {
            method: 'POST',
            body: password,
            headers: {
                'Content-Type': 'text/plain'
            },
            credentials: 'include'
        });

        const data = await response.json<{ success: boolean, error: string }>();
        if (data.success) {
            return true;
        } else {
            return data.error;
        }
    },

    async isConnected() {
        const response = await fetch('http://localhost:3000/signin', {
            method: 'GET',
            credentials: 'include'
        });
        const data = await response.json<{ success: boolean }>();
        return !!data.success;
    },

    async saveArticle(article: Article) {
        if (article !== undefined) {
            await fetch('http://localhost:3000/save-article', {
                method: 'POST',
                body: JSON.stringify(article),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(article);
            return true;
        } else {
            console.log('ERROR, ARTICLE NOT SAVED \nRecieved article : ', article);
            return false;
        }
    }
};
