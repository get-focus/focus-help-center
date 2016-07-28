import * as React from 'react';
import {connect} from 'react-redux';
import {loadSectionList} from '../../actions/section-list';
import {getArticles, searchArticleList, loadArticleList} from '../../actions/article-list';
import {withRouter} from 'react-router';
import {ArticleList} from '../article-list';

@withRouter
@connect(
    state => ({
        sections: state.sectionList.list,
        sectionDetail: state.sectionDetail,
        connected: state.login.isConnected,
        articleList: state.articleList
    }),
    dispatch => ({
        loadSectionList: () => dispatch(loadSectionList()),
        loadArticleList: () => dispatch(loadArticleList()),
        getArticles: (sectionId) => dispatch(getArticles(sectionId)),
        search: () => dispatch(searchArticleList())
    })
)
export class SectionList extends React.Component {

    componentWillMount() {
        this.props.loadSectionList();
        if (this.props.sectionID && this.props.sectionID !== 'all') {
            this.props.getArticles(this.props.sectionID);
        } else if (this.props.sectionID && this.props.sectionID === 'all') {
            this.props.loadArticleList();
        }
    }

    renderSectionList = () => {
        const {sections, sectionID} = this.props;
        return (
            <div>
                <button className={`accordion${sectionID === 'all' ? ' active' : ''}`} onClick={() => this.onClickHandler(null, 0) } ref={`button${0}`}>Tous les articles</button>
                <div className={`panel${sectionID === 'all' ? ' show' : ''}`} >
                    {sectionID === 'all' ? <ArticleList /> : null}
                </div>
                {sections && sections.length > 0 ?
                    sections.map((section, index) => {
                        return (
                            <div>
                                <button className={`accordion${+sectionID === section.id ? ' active' : ''}`} onClick={() => this.onClickHandler(section.id, index+1) } ref={`button${index+1}`}>{section.name}</button>
                                <div className={`panel${+sectionID === section.id ? ' show' : ''}`}>
                                    {+sectionID === section.id ? <ArticleList /> : null}
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
            this.props.router.push('/sections');
            this.props.loadArticleList();
        } else if (sectionID !== null && buttonElement.className === 'accordion') {
            this.props.router.push(`/sections/${sectionID}/articles`);
            this.props.getArticles(sectionID);
        } else {
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
