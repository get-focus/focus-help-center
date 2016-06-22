import '../../style';
import ArticleListTitle from '../../../common/components/article-list/title';
import {ArticleList} from '../../../common/components/article-list';
import {FlatButton} from 'material-ui';

export function Home() {
    return (
        <div className='layout'>
            <header>
                <ArticleListTitle textFieldUnderline={false} hintText={'Rechercher dans le centre d\'aide'}/>
            </header>
            <div className='content'>
                <ArticleList />
            </div>
            <footer>
                <FlatButton
                    icon={<i className='material-icons'>exit_to_app</i>}
                    label='voir tous les articles'
                    onClick={() => window.open('http://localhost:9999')}
                    primary={true}
                    rippleColor='transparent'
                    style={{width: '100%', textAlign: 'left'}}
                />
            </footer>
        </div>
    );
}
