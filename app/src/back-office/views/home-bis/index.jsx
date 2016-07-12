import React from 'react';
import Layout from '../../layout';
import {SectionList} from '../../../common/components/section-list';
import ArticleListTitle from '../../../common/components/article-list/title';
import {ArticleConsult} from '../../../common/components/article-consult';
import {Link} from 'react-router';
import {FlatButton} from 'material-ui';
import {connect} from 'react-redux';

function renderLeftContent() {
    return (
        <div>
            <FlatButton label='imprimer' icon={<i className="material-icons">print</i>} secondary={true} onClick={() => window.print() } />
            <FlatButton label='envoyer' icon={<i className="material-icons">send</i>} secondary={true} />
        </div>
    );
}

// HERE we will give the section's article to do : /section/id/articles at close
function renderRightContent() {
    return (
        <Link to='/home-bis'><i className='material-icons close'>close</i></Link>
    );
}

const actions = {
    primary: [
        {icon: 'home', route: '/home'}
    ]
};

export default connect(
    state => ({article: state.articleDetail.article})
)(function HomeBis({params, article, ...props}) {
    let pathSplit = props.route.path.split('/');
    console.log(article);
    return (
        <Layout Content={<ArticleListTitle />} actions={actions}>
            <SectionList sectionID={pathSplit[0] === 'article' ? null : params.id}/>
            {pathSplit[0] === 'article' ? <ArticleConsult id={params.id} leftContent={renderLeftContent() } rightContent={renderRightContent() } /> : null}
        </Layout>
    );
});
