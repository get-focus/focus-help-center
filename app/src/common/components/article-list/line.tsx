import {Article} from '../../definitions/article';
import i18n from 'i18next';

/** Component that displays an article as a line. */
export function ArticleLine({article: {id, title, description}, onClickEdit}: {article: Article, onClickEdit}) {
    return (
        <a className='article-list-item' href="#">
            <i className='material-icons'>receipt</i>
            <div className='article-list-item-content'>
                <div className='article-list-item-content-title'>
                    {title}
                </div>
                <div className='article-list-item-content-description'>
                    {description}
                </div>
            </div>
            <div
                className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored article-list-item-button'
                onClick={() => onClickEdit(id)}
            >
                <i className='material-icons'>edit</i>
                {i18n.t('article-list.item.edit')}
            </div>
        </a>
    );
}
