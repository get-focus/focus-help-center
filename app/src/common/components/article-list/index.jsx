import {connect} from 'react-redux';
import {Component, PropTypes} from 'react';

import {loadArticleList} from '../../actions/article-list';
import {ArticleList as List} from './list';

/** Component that displays the list of all articles, connected to the store. */
@connect(
    state => ({
        articleList: state.articleList,
        connected: state.login.isConnected
    }),
    dispatch => ({loadArticleList: () => dispatch(loadArticleList())})
)
export class ArticleList extends Component {
    static propTypes = {
        articleList: PropTypes.object,
        loadArticleList: PropTypes.func,
        connected: PropTypes.bool
    }

    componentWillMount() {
        this.props.loadArticleList();
    }

    componentWillReceiveProps({connected}) {
        if (this.props.connected !== connected) {
            this.componentWillMount();
        }
    }

    render() {
        const {connected, articleList} = this.props;
        return <List articleList={articleList} connected={connected} />;
    }
}
