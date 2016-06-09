import Layout from '../../layout';
import {ArticleList} from '../../../common/components/article-list';
import i18n from 'i18next';

/** Root component of the back-office app. */
export function HomeView() {
    return (
        <Layout Content={<h3>{i18n.t('article-list.title')}</h3>}>
            <ArticleList />
        </Layout>
    );
}
