import {connect} from 'react-redux';
import {Component} from 'react';
import {searchArticleList} from '../../actions/article-list';
import i18n from 'i18next';

@connect(
    state => ({
        filter: state.articleList.filter,
        loading: state.articleList.isLoading,
        error: state.articleList.error
    }),
    dispatch => ({search: filter => dispatch(searchArticleList(filter))})
)
export class ArticleListTitle extends Component {

    componentDidMount() {
        componentHandler.upgradeDom();
    }

    render() {
        console.log(this.props);
        const {loading, filter, search, error} = this.props;
        return (
            <div className='article-list-header'>
                <h3>{i18n.t('article-list.title')}</h3>
                <div className='article-list-header-search'>
                    <i className='material-icons'>search</i>
                    <div className='mdl-textfield mdl-js-textfield'>
                        <input className='mdl-textfield__input' type='text' id='id' value={filter} onChange={e => search(e.target.value)} />
                        <label className={`mdl-textfield__label ${error ? 'label-error' : ''}`} htmlFor='id' style={loading && filter ? {display: 'none'} : {}} />
                        <div className='mdl-progress mdl-js-progress mdl-progress__indeterminate' style={!(loading && filter) ? {display: 'none'} : {}} />
                    </div>
                </div>
            </div>
        );
    }
}
