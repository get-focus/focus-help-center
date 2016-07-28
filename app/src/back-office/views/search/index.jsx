import React from 'react';
import ConsultLayout from '../consult-article/consult-layout';
import ArticleListTitle from '../../../common/components/article-list/title';
import {ArticleList} from '../../../common/components/article-list';

export function SearchView() {
    return (
        <ConsultLayout Content={<ArticleListTitle />}>
            <ArticleList isExtension={true} />
        </ConsultLayout>
    );
}
