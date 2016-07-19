import * as React from 'react';
import {connect} from 'react-redux';
import {loadSectionList} from '../../actions/section-list';
import {getArticles, loadArticleList} from '../../actions/article-list';
import {loadSection, clearSection} from '../../actions/section-detail';
import {withRouter} from 'react-router';
import {ArticleList} from '../article-list';

@withRouter
@connect(
    state => ({
        sections: state.sectionList.list,
        sectionDetail: state.sectionDetail,
        connected: state.login.isConnected
    }),
    dispatch => ({
        clearSection: () => dispatch(clearSection()),
        loadSectionList: () => dispatch(loadSectionList()),
        loadArticleList: () => dispatch(loadArticleList()),
        loadSection: (id) => dispatch(loadSection(id)),
        getArticles: (sectionId) => dispatch(getArticles(sectionId))
    })
)
export class SectionList extends React.Component {

    componentWillMount() {
        this.props.loadSectionList();
        this.props.clearSection();
    }

    sectionClickHandler = (sectionID) => {
        if (sectionID) {
            this.props.getArticles(sectionID);
            this.props.router.push(`/section/${sectionID}/articles`);
            this.props.loadSection(sectionID);
        } else {
            this.props.router.push('/home');
            this.props.loadSectionList();
            this.props.clearSection();
        }
    }

    renderSectionList = () => {
        const {sections} = this.props;
        if (sections.length > 0) {
            return (sections.map((section, index) =>
                <div>
                    <button className="accordion" onClick={() => this.onClickHandler(section.id, index) } ref={`button${index}`}>{section.name}</button>
                    <div className="panel">
                        <ArticleList />
                    </div>
                </div>
            ));
        }
    };

    onClickHandler = (sectionID, index) => {
        const buttonElement = this.refs[`button${index}`];

        if (buttonElement.className === 'accordion') {
            buttonElement.className += ' active';
            this.props.getArticles(sectionID);
            this.props.router.push(`/section/${sectionID}/articles`);
            buttonElement.nextElementSibling.classList.toggle('show');
        } else {
            buttonElement.className = 'accordion';
            buttonElement.nextElementSibling.classList.toggle('show');
            this.props.router.push('/home');
        }
    }

    render() {
        return (
            <div className='section-list'>
                <div className='section-list-title'>Bienvenue dans le Centre d'aide</div>
                {this.renderSectionList() }
            </div>
        );
    }
}
