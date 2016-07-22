import React from 'react';
import ConsultLayout from './consult-layout';
import ArticleListTitle from '../../../common/components/article-list/title';
import {ArticleConsult} from '../../../common/components/article-consult';

export function ConsultView({params}) {
    return (
        <ConsultLayout Content={<ArticleListTitle />}>
            {params.id ? <ArticleConsult id={params.id} /> : null}
        </ConsultLayout>
    );
}
