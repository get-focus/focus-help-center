import fetch from 'isomorphic-fetch';
import {Article} from '../definitions/article';
import {Section} from '../definitions/section';
import {Api} from './index';

declare const process: any;
const isBundle = process.env.IS_BUNDLE === 'true';
export const apiRoot = isBundle ? '.' : 'http://localhost:1337';

async function fetchWithLogin(url: string, options?) {
    try {
        const token = localStorage.getItem('token');
        if (token) {
            return await fetch(url, Object.assign({}, options, { headers: Object.assign({}, options && options.headers || {}, { Authorization: `Bearer ${token}` }) }));
        } else {
            return await fetch(url, Object.assign({}, options, isBundle ? { credentials: 'include' } : {}));
        }
    } catch (e) {
        throw new Error(e.message);
    }
}

/** Api object to call the server. */
export const api: Api = {
    async loadArticleList(filter?: string) {
        const response = await fetchWithLogin(`${apiRoot}/api/article${filter ? `?filter=${filter}` : ''}`);
        return response.json<Article[]>();
    },

    async loadSectionList() {
        const response = await fetchWithLogin(`${apiRoot}/api/section`);
        return response.json<Section[]>();
    },

    async login(password) {
        const response = await fetchWithLogin(`${apiRoot}/signin`, {
            method: 'POST',
            body: password
        });
        const data = await response.json<{ token: string, error: string }>();
        if (data.token) {
            localStorage.setItem('token', data.token);
            return true;
        } else {
            localStorage.removeItem('token');
            throw new Error(data.error);
        }
    },

    async isConnected() {
        const response = await fetchWithLogin(`${apiRoot}/signin`);
        return await response.json<{ connected: boolean, userName?: string }>();
    },

    async saveArticle(article) {
        const response = await fetchWithLogin(`${apiRoot}/api/article`, {
            method: 'POST',
            body: JSON.stringify(article),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json<Article | { error: string }>();
        if ((data as Article).title) {
            return data;
        } else {
            throw new Error((data as { error }).error);
        }
    },

    async manageArticleSection(articleId, sections) {
        const sectionsList = {
            List: sections
        };
        const response = await fetchWithLogin(`${apiRoot}/api/article/${articleId}/sections`, {
            method: 'POST',
            body: JSON.stringify(sectionsList),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json<{articleId: number, sections: Section[]} | { error: string }>();
        if (data) {
            return data;
        } else {
            throw new Error((data as { error }).error);
        }
    },

    async deleteArticle(id) {
        const response = await fetchWithLogin(`${apiRoot}/api/article/${id}`, { method: 'DELETE' });
        const data = await response.json<{ success: boolean, error: string }>();
        if (data.success) {
            return true;
        } else {
            throw new Error(data.error);
        }
    },

    async getArticle(id) {
        const response = await fetchWithLogin(`${apiRoot}/api/article/${id}`, { method: 'GET' });
        const data = await response.json<Article | { error: string }>();
        if ((data as Article).title) {
            return data;
        } else {
            throw new Error((data as { error }).error);
        }
    },

    async getSectionArticles(id) {
        const response = await fetchWithLogin(`${apiRoot}/api/section/${id}/articles`);
        return response.json<Article[]>();
    },

    async getSection(id) {
        const response = await fetchWithLogin(`${apiRoot}/api/section/${id}`, { method: 'GET' });
        const data = await response.json<Section | { error: string }>();
        if ((data as Section).name) {
            return data;
        } else {
            throw new Error((data as { error }).error);
        }
    }
};
