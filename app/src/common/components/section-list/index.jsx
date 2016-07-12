import * as React from 'react';
import {connect} from 'react-redux';
import {loadSectionList} from '../../actions/section-list';
import {getArticles, loadArticleList} from '../../actions/article-list';
import {List, ListItem, Subheader} from 'material-ui';
import {withRouter} from 'react-router';
import {ArticleList} from '../article-list';

@withRouter
@connect(
    state => ({
        sectionList: state.sectionList,
        connected: state.login.isConnected
    }),
    dispatch => ({
        loadSectionList: () => dispatch(loadSectionList()),
        loadArticleList: () => dispatch(loadArticleList()),
        getArticles: (sectionId) => dispatch(getArticles(sectionId))
    })
)
export class SectionList extends React.Component {

    componentWillMount() {
        this.props.loadSectionList();
    }

    componentDidUpdate() {
        if (this.props.sectionID) {
            this.props.getArticles(+this.props.sectionID);
        } else {
            this.props.loadArticleList();
        }
    }

    sectionClickHandler = (sectionID) => {
        this.props.getArticles(sectionID);
        this.props.router.push(`/section/${sectionID}/articles`);
    }

    renderSectionList = () => {
        const {sectionList} = this.props;
        if (sectionList.list.length > 0) {
            return (sectionList.list.map((section, index) =>
                <ListItem primaryText={section.name} key={index} onClick={() => this.sectionClickHandler(section.id) } />
            ));
        }
    };

    render() {
        return (
            <div className='section-list'>
                <List className='list' style={{paddingTop: '15px'}}>
                    <Subheader>Rubriques</Subheader>
                    {this.renderSectionList() }
                </List>
                <div className='article-list-area'>
                    <Subheader style={{paddingTop: '15px'}}>Liste des rubriques</Subheader>
                    <ArticleList />
                </div>
            </div>
        );
    }
}
