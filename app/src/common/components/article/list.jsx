import {connect} from 'react-redux';
import {Component, PropTypes} from 'react';

import {loadArticleList} from '../../actions/article-list';
import ArticleLine from './line';

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
        const {articleList} = this.props;
        return (
            <div className='article-list'>
                <h3>Liste des articles d'aide</h3>
                <div
                    style={!articleList.isLoading ? {display: 'none'} : {}}
                    className={`mdl-spinner mdl-spinner--single-color mdl-js-spinner ${articleList.isLoading ? 'is-active' : ''}`}
                />
                {articleList.error ?
                    <div className='article-list-error'><i className='material-icons'>error</i><div>{articleList.error}</div></div>
                : ''}
                {articleList.list && articleList.list.map(article =>
                    <ArticleLine
                        key={article.id}
                        article={article}
                        onClickEdit={() => null}
                    />
                )}
            </div>
        );
    }
}