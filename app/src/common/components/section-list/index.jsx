import * as React from 'react';
import {connect} from 'react-redux';
import {loadSectionList} from '../../actions/section-list';
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
        loadSectionList: () => dispatch(loadSectionList())
    })
)
export class SectionList extends React.Component {

    componentWillMount() {
        this.props.loadSectionList();
    }

    renderSectionList = () => {
        const {sectionList} = this.props;
        if (sectionList.list.length > 0) {
            return (sectionList.list.map((section, index) =>
                <ListItem primaryText={section.name} key={index} onClick={() => this.props.router.push('/home') } />
            ));
        }
    };

    renderArticleList = () => {
        const {articleList} = this.props;
        if (articleList.list.length > 0) {
            return (articleList.list.map((article, index) =>
                <ListItem primaryText={article.title} key={index} onClick={() => this.props.router.push('/home') } />
            ));
        }
    }

    render() {
        return (
            <div className='section-list'>
                <List className='list' style={{paddingTop: '15px'}}>
                    <Subheader>Rubriques</Subheader>
                    {this.renderSectionList() }
                </List>
                <div className='article-list-area'>
                    <ArticleList />
                </div>
            </div>
        );
    }
}
