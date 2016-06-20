import {connect} from 'react-redux';
import {Component} from 'react';
import {searchArticleList} from '../../actions/article-list';
import i18n from 'i18next';
import {TextField, LinearProgress} from 'material-ui';

@connect(
    state => ({
        filter: state.articleList.filter,
        loading: state.articleList.isLoading,
        error: state.articleList.error
    }),
    dispatch => ({search: filter => dispatch(searchArticleList(filter))})
)
export class ArticleListTitle extends Component {
    render() {
        const {loading, filter, search, error} = this.props;
        return (
            <div className='article-list-header'>
                <h3>{i18n.t('article-list.title')}</h3>
                <div className='article-list-header-search'>
                    <i className='material-icons'>search</i>
                    <div className='article-list-header-search-bar'>
                        <TextField
                            underlineShow={!(loading && filter)}
                            errorText={error ? ' ' : null}
                            errorStyle={{color: 'indianred'}}
                            value={filter}
                            onChange={e => search(e.target.value)}
                        />
                        {loading && filter ? <LinearProgress style={{position: 'absolute', bottom: '8px', height: '2px'}} /> : null}
                    </div>
                </div>
            </div>
        );
    }
}
