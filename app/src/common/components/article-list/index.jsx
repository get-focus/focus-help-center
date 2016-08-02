import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import {loadArticleList} from '../../actions/article-list';
import {showSnackBar} from '../../actions/snack-bar';
import {ArticleList as List} from './list';
import {withRouter} from 'react-router';

/** Component that displays the list of all articles, connected to the store. */
@withRouter
@connect(
    state => ({
        articleList: state.articleList,
        connected: state.login.isConnected
    }),
    dispatch => ({
        loadArticleList: () => dispatch(loadArticleList()),
        showSnackBar: data => dispatch(showSnackBar(data))
    })
)
export class ArticleList extends React.Component {
    static propTypes = {
        articleList: PropTypes.object,
        loadArticleList: PropTypes.func,
        connected: PropTypes.bool,
        isExtension: PropTypes.bool
    }

    state = {open: false};

    render() {
        const {connected, articleList, isExtension} = this.props;
        return (
            <div style={{flex: 1}}>
                <List articleList={articleList} connected={connected} isExtension={isExtension}/>
            </div>
        );
    }
}
