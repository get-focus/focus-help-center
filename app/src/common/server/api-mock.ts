import {Api} from './index';

/** Mock data for the api mock object. */
export const apiMockData = {
    loadArticleList: [
        {id: 1, title: 'Title', description: 'Description', content: 'Content'},
        {id: 2, title: 'Title2', description: 'Description2', content: 'Content2'}
    ]
};

/** Mock api object for testing. */
export const api: Api = {
    async loadArticleList() {
        return apiMockData.loadArticleList;
    }
};
