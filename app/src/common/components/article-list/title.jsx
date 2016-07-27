import React from 'react';
import {connect} from 'react-redux';
import {searchArticleList} from '../../actions/article-list';
import i18n from 'i18next';
import {AutoComplete, MenuItem} from 'material-ui';
import {withRouter} from 'react-router';

@withRouter
@connect(
    state => ({
        filter: state.articleList.filter,
        loading: state.articleList.isLoading,
        error: state.articleList.error,
        articleList: state.articleList.list
    }),
    dispatch => ({search: filter => dispatch(searchArticleList(filter))})
)
export default class ArticleListTitle extends React.Component {

    render() {
        const {filter, search, error, articleList} = this.props;
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
                            hintStyle={{color: 'white', bottom: 11, font: 'normal 16px Roboto,sans-serif'}}
                            inputStyle={{color: 'white'}}
                            onFocus={e => e.target.parentNode.parentNode.parentNode.parentNode.className += ' focused'}
                            onBlur={e => e.target.parentNode.parentNode.parentNode.parentNode.className = 'top-search'}
                            style={{width: 350, marginTop: '-5px'}}
                            onUpdateInput={e => search(e) }
                            filter={() => articleList.map(article => article.title) }
                            underlineShow={false}
                            dataSource={articleList ?
                                articleList.map(article => {
                                    return {
                                        text: article.title,
                                        value: (
                                            <MenuItem
                                                className='menu-item'
                                                primaryText={article.title}
                                                leftIcon={<i className='material-icons' style={{fontSize: 20, marginTop: 14.5}}>description</i>}
                                                onClick={() => this.props.router.push(`article/${article.id}`) }
                                                />
                                        )
                                    };
                                }) : []}
                            />
                    </div>
                </div>
            </div>
        );
    }
}
