import {Home} from './views/home';
import {Consult} from './views/consult';
import {api} from '../common/server/api';

export default {
    path: '/',
    indexRoute: {onEnter: ({params}, replace) => replace('home')},
    childRoutes: [
        {
            path: 'home',
            component: Home
        },
        {
            path: 'article/:id',
            component: Consult
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
};
