import Layout from '../../views/layout';
import '../../style';
import ArticleListTitle from '../../../common/components/article-list/title';
import {ArticleList} from '../../../common/components/article-list';
import {ArticleConsult} from '../../../common/components/article-consult';


export function Home({params}) {
    return (
        <Layout Content={<ArticleListTitle />} >
            <ArticleList />
            {params.id ? <ArticleConsult id={params.id} /> : null}
        </Layout>
    );
}
