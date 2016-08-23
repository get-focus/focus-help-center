import {Api} from './';

export const article1 = { id: 1, title: 'Title', description: 'Description', content: 'Content', published: true };
export const article2 = { id: 2, title: 'Title2', description: 'Description2', content: 'Content2', published: false };
export const section1 = { id: 1, name: 'Tutorial' };
export const section2 = { id: 2, name: 'Stop' };

/** Mock data for the api mock object. */
export const apiMockData = {
    getArticle: article1,
    loadArticleList: [article1, article2],
    loadSectionList: [section1, section2],
    getSection: section1,
    manageArticleSection: { articleId: 1, sections: [section1, section2]
    },
    getSectionArticles: [article1, article2]
};

/** Mock api object for testing. */
export const api: Api = {
    async loadArticleList() {
        return apiMockData.loadArticleList;
    },

    async loadSectionList() {
        return apiMockData.loadSectionList;
    },

    async manageArticleSection() {
        return apiMockData.manageArticleSection;
    },

    async getSectionArticles() {
        return apiMockData.getSectionArticles;
    },

    async login(password) {
        if (password === 'password') {
            return true;
        } else {
            throw new Error('Incorrect password');
        }
    },

    async isConnected() {
        return { connected: true };
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
    },

    async searchArticle() {
        return apiMockData.getArticle;
    },
};
