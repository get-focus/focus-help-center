import * as React from 'react';
import {Article} from '../../definitions/article';
import {Link} from 'react-router';
import i18n from 'i18next';
import {RaisedButton, FontIcon} from 'material-ui';

/** Component that displays an article as a line. */
export function ArticleLine({isExtension, article: {id, title, description, published}, canEdit}: { isExtension: boolean, article: Article, canEdit: boolean }, {muiTheme}) {
    return (
        <div className={`${isExtension ? ' extension-item' : 'item'}`} style={!isExtension ? {backgroundColor: muiTheme.palette.primary3Color} : {}}>
            <i className='material-icons'>description</i>

            <Link className='content' to={`article/${id}`}>
                <div className='title'>
                    {title} <span className='material-icons'>{ canEdit ? published && canEdit ? 'visibility' : 'visibility_off' : null}</span>
                </div>
                <div className='description'>
                    {description}
                </div>
            </Link>
            {canEdit ?
                <Link className='button' to={`edit-article/${id}`}>
                    <RaisedButton
                        secondary={true}
                        label={i18n.t('article-list.item.edit') }
                        style={{borderRadius: '5px'}}
                        icon={<FontIcon color='white' className='material-icons'>edit</FontIcon>}
                        />
                </Link>
                : null
            }
        </div>
    );
}

ArticleLine['contextTypes'] = {
    muiTheme: React.PropTypes.object.isRequired
};
