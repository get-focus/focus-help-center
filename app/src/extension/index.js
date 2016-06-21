import ReactDOM from 'react-dom';
import {HelpCenterBase} from '../common/components';
import Layout from './views/layout';
import './style';
import ArticleListTitle from '../common/components/article-list/title';
import {ArticleList} from '../common/components/article-list';


function Extension() {
    return (
        <HelpCenterBase>
            <Layout Content={<ArticleListTitle />} >
                <ArticleList />
            </Layout>
        </HelpCenterBase>
    );
}

ReactDOM.render(<Extension />, document.getElementById('root'));
