import {Article} from '../../definitions/article';
import {Link} from 'react-router';
import i18n from 'i18next';

/** Component that displays an article as a line. */
export function ArticleLine({article: {id, title, description}, canEdit}: {article: Article, canEdit: boolean}) {
    return (
        <div className='article-list-item'>
            <i className='material-icons'>receipt</i>
            <Link className='article-list-item-content' to={`article/${id}`}>
                <div className='article-list-item-content-title'>
                    {title}
                </div>
                <div className='article-list-item-content-description'>
                    {description}
                </div>
            </Link>
            {canEdit ?
                <Link className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored article-list-item-button' to={`edit-article/${id}`}>
                    <i className='material-icons'>edit</i>
                    {i18n.t('article-list.item.edit')}
                </Link>
            : ''}
        </div>
    );
}
