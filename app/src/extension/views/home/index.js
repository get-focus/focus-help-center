import React from 'react';
import '../../style';
import ArticleListTitle from '../../../common/components/article-list/title';
import {ArticleList} from '../../../common/components/article-list';
import {FlatButton} from 'material-ui';
import i18n from 'i18next';
import {backOfficeUrl} from '../../../common/server/config';

export function Home() {
    return (
        <div className='layout'>
            <header>
                <ArticleListTitle isExtension={true}/>
            </header>
            <div className='content'>
                <ArticleList isExtension={true}/>
            </div>
            <footer>
                <a href={backOfficeUrl} target='_blank'>
                    <FlatButton
                        icon={<i className='material-icons'>exit_to_app</i>}
                        label={i18n.t('extension.footer.button')}
                        primary={true}
                        rippleColor='transparent'
                        style={{width: '100%', textAlign: 'left'}}
                    />
                </a>
            </footer>
        </div>
    );
}
