import * as React from 'react';

import {ArticleListState} from '../../definitions/article-list';
import {ArticleLine} from './line';
import {CircularProgress} from 'material-ui';

/** Component that displays the list of all articles */
export function ArticleList({isExtension, articleList: {isLoading, list, error}, connected}: {articleList: ArticleListState, connected: boolean, openCreate: () => void}) {
    const loading = isLoading && (!list || list && list.length === 0);
    return (
        <div className='article-list'>
            {loading ? <CircularProgress style={{marginLeft: 'calc(50% - 25px)'}} /> : null}
            {error ?
                <div className='error'><i className='material-icons'>error</i><div>{error}</div></div>
            : null}
            {list && list.map(article =>
                <ArticleLine
                    key={article.id}
                    article={article}
                    canEdit={connected}
                    isExtension={isExtension}
                />
            )}
        </div>
    );
}
