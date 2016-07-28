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
            if (filter) {
                this.props.loadArticleList();
            }
            this.props.router.push(`search?filter${filter ? `=${filter}` : ''}`);
        }
    };

    render() {
        const {filter, search, error, articleList, isExtension} = this.props;
        const {value} = this.state;
        return (
            <div className='article-list-header'>
                <div className={'top-search'} style={isExtension ? {width: 330, background: '#FAFAFA', borderRadius: '2px', boxShadow: 'none', padding: '5px 3px', marginBottom: '8px'} : null}>
                    <i className='material-icons' style={isExtension ? {opacity: '.3', color: 'black'} : null}>search</i>
                    <div className='search-bar'>
                        <AutoComplete
                            errorText={error ? ' ' : null}
                            errorStyle={{color: 'indianred'}}
                            searchText={value}
                            hintText={i18n.t('search.placeholder') }
                            hintStyle={{color: isExtension ? '#BDBDBD' : 'white', bottom: 11, font: 'normal 16px Roboto,sans-serif'}}
                            inputStyle={{color: isExtension ? '#212121' : 'white'}}
                            onFocus={e => e.target.parentNode.parentNode.parentNode.parentNode.className += ' focused'}
                            onBlur={e => e.target.parentNode.parentNode.parentNode.parentNode.className = 'top-search'}
                            style={{width: 350, marginTop: '-5px'}}
                            onUpdateInput={e => search(e) }
                            filter={() => articleList.map(article => article.title) }
                            underlineShow={false}
                            ref='autocomplete'
                            fullWidth={true}
                            onKeyDown={(e) => this.keyDownHandler(e, filter)}
                            dataSource={articleList ?
                                articleList.map(article => {
                                    return {
                                        text: article.title,
                                        value: (
                                            <MenuItem
                                                className='menu-item'
                                                primaryText={article.title}
                                                leftIcon={<i className='material-icons' style={{fontSize: 20, marginTop: 14.5, color: '#2196F3'}}>description</i>}
                                                onClick={() => { this.props.router.push(`article/${article.id}`); this.setState({value: ''}); } }
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
