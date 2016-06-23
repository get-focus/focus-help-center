import '../../style';
import ArticleListTitle from '../../../common/components/article-list/title';
import {ArticleList} from '../../../common/components/article-list';
import {FlatButton} from 'material-ui';
import i18n from 'i18next';

export function Home() {
    return (
        <div className='layout'>
            <header>
                <ArticleListTitle textFieldUnderline={false}/>
            </header>
            <div className='content'>
                <ArticleList />
            </div>
            <footer>
                <FlatButton
                    icon={<i className='material-icons'>exit_to_app</i>}
                    label={i18n.t('extension.footer.button')}
                    onClick={() => window.open(process.env.ENV === 'development' ? 'http://localhost:9999' : 'https://github.com/get-focus/focus-help-center')}
                    primary={true}
                    rippleColor='transparent'
                    style={{width: '100%', textAlign: 'left'}}
                />
            </footer>
        </div>
    );
}
