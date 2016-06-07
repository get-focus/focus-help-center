import {connect} from 'react-redux';
import {Component, PropTypes} from 'react';

import {loadArticleList} from '../../actions/article-list';
import {ArticleList as List} from './list';

/** Component that displays the list of all articles, connected to the store. */
@connect(
    state => ({articleList: state.articleList}),
    dispatch => ({loadArticleList: () => dispatch(loadArticleList())})
)
export class ArticleList extends Component {
    static propTypes = {
        articleList: PropTypes.object,
        loadArticleList: PropTypes.func
    }

    componentWillMount() {
        this.props.loadArticleList();
    }

    render() {
        return <List articleList={this.props.articleList} />;
    }
}
