import React from 'react';
import { Route, IndexRoute } from 'react-router';
import HomeRoute from './home-route';
import EditArticleRoute from './edit-article-route';
import AppLayout from '../../common/components/layout'

export default {
    path: '/',
    indexRoute: { onEnter: ({ params }, replace) => replace('/home') },
    component: AppLayout,
    childRoutes: [...HomeRoute, ...EditArticleRoute]
};