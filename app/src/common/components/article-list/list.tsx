import {ArticleListState} from '../../definitions/article-list';
import i18n from 'i18next';
import {ArticleLine} from './line';

/** Component that displays the list of all articles */
export function ArticleList({articleList: {isLoading, list, error}}: {articleList: ArticleListState}) {
    return (
        <div className='article-list'>
            <h3>{i18n.t('article-list.title')}</h3>
            <div
                style={!isLoading ? {display: 'none'} : {}}
                className={`mdl-spinner mdl-spinner--single-color mdl-js-spinner ${isLoading ? 'is-active' : ''}`}
            />
            {error ?
                <div className='article-list-error'><i className='material-icons'>error</i><div>{error}</div></div>
            : ''}
            {list && list.map(article =>
                <ArticleLine
                    key={article.id}
                    article={article}
                    onClickEdit={() => null}
                />
            )}
        </div>
    );
}
