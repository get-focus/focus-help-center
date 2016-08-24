import React from 'react';
import HomeLayout from './home-layout';
import {SectionList} from '../../../common/components/section-list';
import ArticleListTitle from '../../../common/components/article-list/title';
import {connect} from 'react-redux';

export default connect(
    state => ({section: state.sectionDetail.section})
)(function HomeView({params, section, route}) {
    let pathSplit = route.path.split('/');
    return (
        <div>
        <HomeLayout Content={<ArticleListTitle />}>
            <SectionList sectionID={pathSplit[1] === 'sections' && params.id ? params.id : section.id ? section.id : pathSplit[1] === 'sections' && !params.id ? 'all' : null}/>
        </HomeLayout>
    </div>
    );
});
