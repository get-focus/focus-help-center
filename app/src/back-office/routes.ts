import EditArticle from './views/edit-article';
import HomeView from './views/home';
import {ConsultView} from './views/consult-article';
import {SearchView} from './views/search';
import {api} from '../common/server/api';
import {PlainRoute} from 'react-router';

export default {
    path: '/',
    indexRoute: {onEnter: (_, redirect) => redirect('home')},
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
        },
        {
            path: 'query',
            onEnter: async ({location: {query: {url, block}}}, redirect, done) => {
                const article = await api.searchArticle(url, block);
                if (typeof article === 'boolean') {
                    redirect('home');
                } else {
                    redirect(`article/${article.id}`);
                }
                done();
            }
        }
    ]
} as PlainRoute;
