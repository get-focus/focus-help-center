import React from 'react';
import Layout from '../../layout';
import {SectionList} from '../../../common/components/section-list';
import ArticleListTitle from '../../../common/components/article-list/title';

const actions = {
    primary: [
        {icon: 'home', route: '/home'}
    ]
};

export function HomeBis() {
    return (
        <Layout Content={<ArticleListTitle />} actions={actions}>
            <SectionList />
        </Layout>
    );
}
