import React from 'react';

import {connect} from 'react-redux';
import {searchArticleList} from '../../actions/article-list';
import i18n from 'i18next';
import {TextField, LinearProgress} from 'material-ui';
import {PropTypes} from 'react';

const defaultProps = {
    textFieldUnderline: true
};

const propTypes = {
    textFieldUnderline: PropTypes.bool
};

function ArticleListTitle({loading, filter, search, error, textFieldUnderline}) {
    return (
        <div className='article-list-header'>
            <div className='search'>
                <i className='material-icons'>search</i>
                <div className='search-bar'>
                    <TextField
                        underlineShow={textFieldUnderline && !(loading && filter)}
                        errorText={error ? ' ' : null}
                        errorStyle={{color: 'indianred'}}
                        value={filter}
                        onChange={e => search(e.target.value)}
                        hintText={i18n.t('search.placeholder')}
                        hintStyle={{color: 'white'}}
                        inputStyle={{color: 'white'}}
                        onFocus={(e) => e.target.parentNode.parentNode.parentNode.className += ' focused'}
                        onBlur={(e) => e.target.parentNode.parentNode.parentNode.className = 'search'}
                        style={{width: 350}}
                    />
                    {textFieldUnderline && loading && filter ? <LinearProgress style={{position: 'absolute', bottom: '8px', height: '2px'}} /> : null}
                </div>
            </div>
        </div>
    );
}

ArticleListTitle.defaultProps = defaultProps;
ArticleListTitle.propTypes = propTypes;

export default connect(
    state => ({
        filter: state.articleList.filter,
        loading: state.articleList.isLoading,
        error: state.articleList.error
    }),
    dispatch => ({search: filter => dispatch(searchArticleList(filter))})
)(ArticleListTitle);
