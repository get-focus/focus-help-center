import React from 'react';
import '../../style';
import {ArticleConsult} from '../../../common/components/article-consult';
import {IconButton} from 'material-ui';
import {browserHistory} from 'react-router';

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
            <IconButton onClick={() => window.open(process.env.ENV === 'development' ? `${process.env.ROOT_BACK_URL}/#/article/${params.id}` : 'https://github.com/get-focus/focus-help-center')} iconStyle={{color: '#29B6F6'}}>
                <i className="material-icons">open_in_new</i>
            </IconButton>
            <IconButton iconStyle={{color: '#29B6F6'}} onClick={() => window.print()}>
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
