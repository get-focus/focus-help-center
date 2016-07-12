import * as React from 'react';
import {connect} from 'react-redux';
import {loadSectionList} from '../../actions/section-list';
import {getArticles, loadArticleList} from '../../actions/article-list';
import {loadSection, clearSection} from '../../actions/section-detail';
import {List, ListItem, Subheader} from 'material-ui';
import {withRouter} from 'react-router';
import {ArticleList} from '../article-list';
import i18n from 'i18next';

@withRouter
@connect(
    state => ({
        sectionList: state.sectionList,
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

    componentDidUpdate() {
        this.setAllSectionListRender();
        if (this.props.sectionID) {
            this.props.getArticles(+this.props.sectionID);
        } else {
            this.props.loadArticleList();
        }
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
        const {sectionList} = this.props;
        if (sectionList.list.length > 0) {
            return (sectionList.list.map((section, index) =>
                <ListItem primaryText={section.name} key={index} onClick={() => this.sectionClickHandler(section.id) } />
            ));
        }
    };

    setAllSectionListRender = () => {
        this.refs.allSection.setState({isKeyboardFocused: true});
    }

    render() {
        console.log(this.props);
        return (
            <div className='section-list'>
                <List className='list' style={{paddingTop: '15px'}}>
                    <Subheader>{i18n.t('section-list-page.title') }</Subheader>
                    <ListItem primaryText={`${i18n.t('section-list-page.all-sections')}`} onClick={() => this.sectionClickHandler()} ref='allSection' />
                    {this.renderSectionList() }
                </List>
                <div className='article-list-area'>
                    <Subheader style={{paddingTop: '15px'}}>{this.props.sectionID ? `${i18n.t('section-list-page.one-section-list')} ${this.props.sectionDetail.section.name}` : `${i18n.t('section-list-page.all-sections')}`}</Subheader>
                    <ArticleList />
                </div>
            </div>
        );
    }
}
