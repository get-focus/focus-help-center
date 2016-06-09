import {ArticleListState} from '../../definitions/article-list';
import {ArticleLine} from './line';
import {Link} from 'react-router';

/** Component that displays the list of all articles */
export function ArticleList({articleList: {isLoading, list, error}}: { articleList: ArticleListState }) {
    return (
        <div className='article-list'>
            <div
                style={!isLoading ? { display: 'none' } : {}}
                className={`mdl-spinner mdl-spinner--single-color mdl-js-spinner ${isLoading ? 'is-active' : ''}`}
                />
            {error ?
                <div className='article-list-error'><i className='material-icons'>error</i><div>{error}</div></div>
                : ''}
            {list && list.map(article =>
                <ArticleLine
                    key={article.id}
                    article={article}
                    />
            )}
            <Link to='/create-article' className='mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored'>
                <i className='material-icons'>add</i>
            </Link>
        </div >
    );
}
