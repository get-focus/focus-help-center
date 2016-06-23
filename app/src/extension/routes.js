import {Home} from './views/home';
import {Consult} from './views/consult';

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
        }
    ]
};
