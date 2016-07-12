import {Api} from './';

/** Mock data for the api mock object. */
export const apiMockData = {
    getArticle: {id: 1, title: 'Title', description: 'Description', content: 'Content', published:  true},
    loadArticleList: [
        {id: 1, title: 'Title', description: 'Description', content: 'Content', published:  true},
        {id: 2, title: 'Title2', description: 'Description2', content: 'Content2', published:  false}
    ],
    loadSectionList: [
        {id: 1, name: 'Tuto'},
        {id: 2, name: 'Stop'}
    ],
    getSection: {id: 1, name: 'Tutorial'}
};

/** Mock api object for testing. */
export const api: Api = {
    async loadArticleList() {
        return apiMockData.loadArticleList;
    },

    async loadSectionList() {
        return apiMockData.loadSectionList;
    },

    async login(password) {
        if (password === 'password') {
            return true;
        } else {
            throw new Error('Incorrect password');
        }
    },

    async isConnected() {
        return {connected: true};
    },

    async saveArticle(article) {
        return article;
    },

    async deleteArticle(id) {
        return true;
    },

    async getArticle() {
        return apiMockData.getArticle;
    },

    async getSection() {
        return apiMockData.getSection;
    }
};
