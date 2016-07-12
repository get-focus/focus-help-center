import EditArticle from './views/edit-article';
import HomeBis from './views/home-bis';

export default {
    path: '/',
    indexRoute: {onEnter: ({params}, replace) => replace('home')},
    childRoutes: [
        {
            path: 'home',
            component: HomeBis
        },
        {
            path: 'article/:id',
            component: HomeBis
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
            component: HomeBis
        }
    ]
};
