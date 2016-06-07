import React from 'react';
import { Route, IndexRoute } from 'react-router';
import {HomeView} from './views/home';
import {EditArticleView} from './views/edit-article';
import {MainLayout} from '../common/components/layout'

export default {
    path: '/',
    indexRoute: { onEnter: ({ params }, replace) => replace('/home') },
    component: MainLayout,
    childRoutes: [
        {
            path: '/home',
            component: HomeView
        },
        {
            path: '/edit-article',
            component: EditArticleView
        }
    ]
};