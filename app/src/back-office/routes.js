import EditArticle from './views/edit-article';
import HomeView from './views/home';
import TestPage from './views/test';

export default {
    path: '/',
    indexRoute: {onEnter: ({params}, replace) => replace('home')},
    childRoutes: [
        {
            path: 'home',
            component: TestPage
        },
        {
            path: 'article/:id',
            component: TestPage
        },
        {
            path: 'edit-article/:id',
            component: EditArticle
        },
        {
            path: 'create-article',
            component: EditArticle
        },
        {
            path: '/section/:id/articles',
            component: TestPage
        }
    ]
};
