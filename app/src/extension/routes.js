import {Home} from './views/home';

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
            component: Home
        }
    ]
};
