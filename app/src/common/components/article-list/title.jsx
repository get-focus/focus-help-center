import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {searchArticleList, loadArticleList} from '../../actions/article-list';
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
    dispatch => ({
        search: filter => dispatch(searchArticleList(filter)),
        loadArticleList: () => dispatch(loadArticleList())
    })
)
export default class ArticleListTitle extends React.Component {

    state = {
        value: ''
    }

    static propTypes = {
        isExtension: PropTypes.bool
    };

    static defaultProps = {
        isExtension: false
    };

    keyDownHandler = (e, filter) => {
        if (e.keyCode === 13) {
            if (!filter) {
                this.props.loadArticleList();
            }
            this.props.router.push(`search?filter${filter ? `=${filter}` : ''}`);
        }
    };

    render() {
        const {filter, search, error, articleList, isExtension} = this.props;
        return (
            <div className='article-list-header'>
                <div className='top-search'>
                    <i className='material-icons' style={{color: 'white'}}>search</i>
                    <div className='search-bar'>
                        <AutoComplete
                            errorText={error ? ' ' : null}
                            errorStyle={{color: 'indianred'}}
                            searchText={filter}
                            hintText={i18n.t('search.placeholder') }
                            hintStyle={{color: '#DDD', bottom: '10px'}}
                            inputStyle={{color: 'white'}}
                            onFocus={e => e.target.parentNode.parentNode.parentNode.parentNode.className += ' focused'}
                            onBlur={e => e.target.parentNode.parentNode.parentNode.parentNode.className = 'top-search'}
                            style={{width: isExtension ? '280px' : '350px', marginTop: '-5px'}}
                            onUpdateInput={e => search(e) }
                            filter={() => articleList.map(article => article.title) }
                            underlineShow={false}
                            ref='autocomplete'
                            fullWidth={true}
                            onKeyDown={(e) => this.keyDownHandler(e, filter)}
                            dataSource={isExtension ? [] : articleList ?
                                articleList.map(article => {
                                    return {
                                        text: article.title,
                                        value: (
                                            <MenuItem
                                                className='menu-item'
                                                primaryText={article.title}
                                                leftIcon={<i className='material-icons' style={{fontSize: 20, marginTop: 14.5, color: '#2196F3'}}>description</i>}
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
