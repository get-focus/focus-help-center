import EditArticle from './views/edit-article';
import HomeView from './views/home';
import {ConsultView} from './views/consult-article';
import {SearchView} from './views/search';

export default {
    path: '/',
    indexRoute: {onEnter: ({params}, replace) => replace('home')},
    childRoutes: [
        {
            path: 'home',
            component: HomeView
        },
        {
            path: 'article/:id',
            component: ConsultView
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
            path: '/sections/:id/articles',
            component: HomeView
        },
        {
            path: '/sections',
            component: HomeView
        },
        {
            path: '/search',
            component: SearchView
        }
    ]
};
