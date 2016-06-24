import React from 'react';
import '../../style';
import {ArticleConsult} from '../../../common/components/article-consult';


export function Consult({params}) {
    return (
        <ArticleConsult id={params.id} />
    );
}
