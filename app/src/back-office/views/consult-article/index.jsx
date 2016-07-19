import React from 'react';
import ConsultLayout from '../layouts/consult-layout';
import ArticleListTitle from '../../../common/components/article-list/title';
import {ArticleConsult} from '../../../common/components/article-consult';
import {Link} from 'react-router';
import {FlatButton} from 'material-ui';

function renderLeftContent() {
    return (
        <div>
            <FlatButton label='imprimer' icon={<i className="material-icons">print</i>} secondary={true} onClick={() => window.print() } />
            <FlatButton label='partager' icon={<i className="material-icons">share</i>} secondary={true} />
        </div>
    );
}

function renderRightContent() {
    return (
        <Link to='/home'> <i className='material-icons close'>close</i></Link>
    );
}

export function ConsultView({params}) {
    return (
        <ConsultLayout Content={<ArticleListTitle />}>
            {params.id ? <ArticleConsult id={params.id} leftContent={renderLeftContent() } rightContent={renderRightContent() } /> : null}
        </ConsultLayout>
    );
}
