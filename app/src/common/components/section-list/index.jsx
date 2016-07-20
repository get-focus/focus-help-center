import * as React from 'react';
import {connect} from 'react-redux';
import {loadSectionList, clearSectionList} from '../../actions/section-list';
import {getArticles, loadArticleList, searchArticleList} from '../../actions/article-list';
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
        clearSectionList: () => dispatch(clearSectionList()),
        loadArticleList: () => dispatch(loadArticleList()),
        loadSection: (id) => dispatch(loadSection(id)),
        getArticles: (sectionId) => dispatch(getArticles(sectionId)),
        search: () => dispatch(searchArticleList())
    })
)
export class SectionList extends React.Component {

    componentWillMount() {
        this.props.loadSectionList();
    }

    renderSectionList = () => {
        const {sections} = this.props;
        return (
            <div>
                <button className="accordion" onClick={() => this.onClickHandler(null, 0) } ref={`button${0}`}>Tous les articles</button>
                <div className="panel">
                    <ArticleList />
                </div>
                {sections && sections.length > 0 ?
                    sections.map((section, index) => {
                        return (
                            <div>
                                <button className="accordion" onClick={() => this.onClickHandler(section.id, index+1) } ref={`button${index+1}`}>{section.name}</button>
                                <div className="panel">
                                    <ArticleList />
                                </div>
                            </div>
                        );
                    }) : null
                }
            </div>
        );
    };

    onClickHandler = (sectionID, index) => {
        const buttonElement = this.refs[`button${index}`];

        // Here i'm closing all the other sections
        const buttonsElements = document.getElementsByClassName('accordion');
        for (let i = 0; i < buttonsElements.length; i++) {
            if (buttonsElements[i].className === 'accordion active' && i !== index) {
                this.refs[`button${i}`].className = 'accordion';
                this.refs[`button${i}`].nextElementSibling.classList.toggle('show');
            }
        }

        if (sectionID === null && buttonElement.className === 'accordion') {
            this.props.search('');
            buttonElement.className += ' active';
            buttonElement.nextElementSibling.classList.toggle('show');
        } else if (sectionID === null && buttonElement.className === 'accordion active') {
            this.props.search('');
            buttonElement.className = 'accordion';
            buttonElement.nextElementSibling.classList.toggle('show');
        } else if (buttonElement.className === 'accordion') {
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
