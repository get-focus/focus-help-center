import React from 'react';
import Layout from '../../layout';
import {ArticleList} from '../../../common/components/article-list';
import ArticleListTitle from '../../../common/components/article-list/title';
import {ArticleConsult} from '../../../common/components/article-consult';

/** Root component of the back-office app. */
export function HomeView({params}) {
    return (
        <Layout Content={<ArticleListTitle />}>
            <ArticleList />
            {params.id ? <ArticleConsult id={params.id} /> : null}
        </Layout>
    );
}
