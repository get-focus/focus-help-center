import React from 'react';
import Layout from '../../layout';
import {ArticleList} from '../../../common/components/article-list';
import ArticleListTitle from '../../../common/components/article-list/title';
import {ArticleConsult} from '../../../common/components/article-consult';
import {Link} from 'react-router';
import {FlatButton} from 'material-ui';

function renderLeftContent() {
    return (
        <div>
            <FlatButton label='imprimer' icon={<i className="material-icons">print</i>} secondary={true} onClick={() => window.print()} />
            <FlatButton label='envoyer' icon={<i className="material-icons">send</i>} secondary={true} />
        </div>
    );
}

function renderRightContent() {
    return (
        <Link to='/'><i className='material-icons close'>close</i></Link>
    );
}

/** Root component of the back-office app. */
export function HomeView({params}) {
    return (
        <Layout Content={<ArticleListTitle />}>
            <ArticleList />
            {params.id ? <ArticleConsult id={params.id} leftContent={renderLeftContent()} rightContent={renderRightContent()} /> : null}
        </Layout>
    );
}
