import fetch from 'isomorphic-fetch';
import {Article} from '../definitions/article';
import {Api} from './index';

/** Api object to call the server. */
export const api: Api = {
    async loadArticleList() {
        const response = await fetch('http://localhost:3000/api/article', {credentials: 'include'});
        return response.json<Article[]>();
    },

    async login(password) {
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

    async saveArticle(article) {
        const response = await fetch('http://localhost:3000/api/article', {
            method: 'POST',
            body: JSON.stringify(article),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json<{success: boolean, error: string}>();
        if (data.success) {
            return true;
        } else {
            return data.error;
        }
    },

    async deleteArticle(id) {
        const response = await fetch(`http://localhost:3000/api/article/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        });

        const data = await response.json<{success: boolean, error: string}>();
        if (data.success) {
            return true;
        } else {
            return data.error;
        }
    }
};
