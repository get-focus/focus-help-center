import {HomeView} from './views/home';
import {EditArticleView} from './views/edit-article';
import {CreateArticleView} from './views/create-article';
import {MainLayout} from '../common/components/layout';

export default {
    path: '/',
    indexRoute: {onEnter: ({params}, replace) => replace('/home')},
    component: MainLayout,
    childRoutes: [
        {
            path: '/home',
            component: HomeView
        },
        {
            path: '/edit-article/:id',
            component: EditArticleView
        },
        {
            path: '/create-article',
            component: CreateArticleView
        }
    ]
};
