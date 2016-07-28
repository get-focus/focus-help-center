import React from 'react';
import HomeLayout from './home-layout';
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

function renderRightContent(sectionId) {
    return (
        <Link to={sectionId ? `/section/${sectionId}/articles` : '/home'}> <i className='material-icons close'>close</i></Link>
    );
}

export default connect(
    state => ({section: state.sectionDetail.section})
)(function HomeView({params, section, ...props}) {
    let pathSplit = props.route.path.split('/');
    return (
        <div>
        <HomeLayout Content={<ArticleListTitle />}>
            <SectionList sectionID={pathSplit[1] === 'sections' && params.id ? params.id : section.id ? section.id : pathSplit[1] === 'sections' && !params.id ? 'all' : null}/>
            {pathSplit[0] === 'article' ? <ArticleConsult id={params.id} leftContent={renderLeftContent() } rightContent={renderRightContent(section.id) } /> : null}
        </HomeLayout>
    </div>
    );
});
