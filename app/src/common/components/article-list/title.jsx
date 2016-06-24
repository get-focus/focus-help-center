import React from 'react';

import {connect} from 'react-redux';
import {searchArticleList} from '../../actions/article-list';
import i18n from 'i18next';
import {TextField, LinearProgress} from 'material-ui';

export default connect(
    state => ({
        filter: state.articleList.filter,
        loading: state.articleList.isLoading,
        error: state.articleList.error
    }),
    dispatch => ({search: filter => dispatch(searchArticleList(filter))})
)(function ArticleListTitle({loading, filter, search, error, textFieldUnderline}) {
    const showUnderline = textFieldUnderline || true;
    return (
        <div className='article-list-header'>
            <h3>{i18n.t('article-list.title')}</h3>
            <div className='search'>
                <i className='material-icons'>search</i>
                <div className='search-bar'>
                    <TextField
                        underlineShow={showUnderline && !(loading && filter)}
                        errorText={error ? ' ' : null}
                        errorStyle={{color: 'indianred'}}
                        value={filter}
                        onChange={e => search(e.target.value)}
                        hintText={i18n.t('search.placeholder')}
                    />
                    {showUnderline && loading && filter ? <LinearProgress style={{position: 'absolute', bottom: '8px', height: '2px'}} /> : null}
                </div>
            </div>
        </div>
    );
});
