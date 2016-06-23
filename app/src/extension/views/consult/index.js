import React from 'react';
import '../../style';
import {ArticleConsult} from '../../../common/components/article-consult';
import {IconButton} from 'material-ui';

function renderRightContent() {
    return (
        <div>
            <IconButton>
                <i className="material-icons">open_in_new</i>
            </IconButton>
            <IconButton>
                <i className="material-icons">print</i>
            </IconButton>
        </div>
    );
}

export function Consult({params}) {
    return (
        <ArticleConsult id={params.id} rightContent={renderRightContent()} />
    );
}
