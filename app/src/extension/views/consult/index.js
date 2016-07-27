import React from 'react';
import '../../style';
import {ArticleConsult} from '../../../common/components/article-consult';
import {IconButton} from 'material-ui';
import {browserHistory} from 'react-router';
import {backOfficeUrl} from '../../../common/server/config';

function renderLeftContent() {
    return (
        <IconButton onClick={() => browserHistory.goBack()}>
            <i className="material-icons">keyboard_backspace</i>
        </IconButton>
    );
}

function renderRightContent(params) {
    return (
        <div>
            <a href={`${backOfficeUrl}#/article/${params.id}`} target='_blank'>
                <IconButton >
                    <i className="material-icons">open_in_new</i>
                </IconButton>
            </a>
            <IconButton onClick={() => window.print()}>
                <i className="material-icons">print</i>
            </IconButton>
        </div>
    );
}

export function Consult({params}) {
    return (
        <ArticleConsult id={params.id} leftContent={renderLeftContent() } rightContent={renderRightContent(params)} isExtension={true} />
    );
}
