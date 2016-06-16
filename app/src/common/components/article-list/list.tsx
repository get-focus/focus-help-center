import {ArticleListState} from '../../definitions/article-list';
import {ArticleLine} from './line';
import {Link} from 'react-router';

/** Component that displays the list of all articles */
export function ArticleList({articleList: {isLoading, list, error}, connected}: {articleList: ArticleListState, connected: boolean}) {
    const loading = isLoading && (!list || list && list.length === 0);
    return (
        <div className='article-list'>
            <div
                style={!loading ? {display: 'none'} : {}}
                className={`mdl-spinner mdl-spinner--single-color mdl-js-spinner is-upgraded ${loading ? 'is-active' : ''}`}
            />
            {error ?
                <div className='error'><i className='material-icons'>error</i><div>{error}</div></div>
            : ''}
            {list && list.map(article =>
                <ArticleLine
                    key={article.id}
                    article={article}
                    canEdit={connected}
                />
            )}
            {connected ?
                <Link to='/create-article' className='mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored'>
                    <i className='material-icons'>add</i>
                </Link>
            : ''}
        </div>
    );
}
