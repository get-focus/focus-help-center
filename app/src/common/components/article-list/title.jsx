import React from 'react';
import {connect} from 'react-redux';
import {searchArticleList} from '../../actions/article-list';
import i18n from 'i18next';
import {AutoComplete, MenuItem} from 'material-ui';
import {PropTypes} from 'react';

const defaultProps = {
    textFieldUnderline: true
};

const propTypes = {
    textFieldUnderline: PropTypes.bool
};

function ArticleListTitle({filter, search, error, articleList}) {
    return (
        <div className='article-list-header'>
            <div className='top-search'>
                <i className='material-icons'>search</i>
                <div className='search-bar'>
                    <AutoComplete
                        errorText={error ? ' ' : null}
                        errorStyle={{color: 'indianred'}}
                        searchText={filter}
                        hintText={i18n.t('search.placeholder') }
                        hintStyle={{color: 'white'}}
                        inputStyle={{color: 'white'}}
                        onFocus={e => e.target.parentNode.parentNode.parentNode.parentNode.className += ' focused'}
                        onBlur={e => e.target.parentNode.parentNode.parentNode.parentNode.className = 'top-search'}
                        style={{width: 350, marginTop: '-5px'}}
                        onUpdateInput={e => search(e) }
                        filter={() => articleList.map(article => article.title) }
                        dataSource={articleList.map(article => {
                            return {
                                text: article.title,
                                value: (
                                    <MenuItem
                                        primaryText={article.title}
                                        secondaryText="&#9786;"
                                    />
                                )
                            };
                        }) }
                        />
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
