import fetch from 'isomorphic-fetch';
import {Article} from '../definitions/article';
import {Api} from './index';

async function fetchWithLogin(url: string, options?) {
    const token = localStorage.getItem('token');
    if (token) {
        return fetch(url, Object.assign({}, options, {headers: {Authorization: `Bearer ${token}`}}));
    } else {
        return fetch(url, options);
    }
}

/** Api object to call the server. */
export const api: Api = {
    async loadArticleList() {
        const response = await fetchWithLogin('http://localhost:3000/api/article');
        return response.json<Article[]>();
    },

    async login(password) {
        const response = await fetchWithLogin('http://localhost:3000/signin', {
            method: 'POST',
            body: password
        });
        const data = await response.json<{token: string, error: string}>();
        if (data.token) {
            localStorage.setItem('token', data.token);
            return true;
        } else {
            localStorage.removeItem('token');
            return data.error;
        }
    },

    async isConnected() {
        const response = await fetchWithLogin('http://localhost:3000/signin');
        const data = await response.json<{ success: boolean }>();
        return !!data.success;
    },

    async saveArticle(article) {
        const response = await fetchWithLogin('http://localhost:3000/api/article', {
            method: 'POST',
            body: JSON.stringify(article)
        });

        const data = await response.json<{article: Article, success: boolean, error: string}>();
        if (data.success) {
            return data.article;
        } else {
            return data.error;
        }
    },

    async deleteArticle(id) {
        const response = await fetchWithLogin(`http://localhost:3000/api/article/${id}`, {method: 'DELETE'});
        const data = await response.json<{success: boolean, error: string}>();
        if (data.success) {
            return true;
        } else {
            return data.error;
        }
    }
};
