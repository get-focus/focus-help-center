import React from 'react';
import '../../style';
import {ArticleConsult} from '../../../common/components/article-consult';
import {IconButton} from 'material-ui';
import {browserHistory} from 'react-router';

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

function renderLeftContent() {
    return (
        <IconButton onClick={() => browserHistory.goBack()}>
            <i className="material-icons">keyboard_backspace</i>
        </IconButton>
    );
}

export function Consult({params}) {
    return (
        <ArticleConsult id={params.id} leftContent={renderLeftContent() } rightContent={renderRightContent() } />
    );
}
