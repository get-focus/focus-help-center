import Layout from '../../layout';
import {EditPage} from '../../../common/components/article-edition';
import EditCartridgeContent from '../../../common/components/article-edition/edit-cartridge-content';
import {TitleComponent} from '../home/title-component';

/** Edition page. */
export function EditArticle({params}) {
    return (
        <Layout Content={<EditCartridgeContent />} BarMiddle={<TitleComponent />}>
            <EditPage id={+params.id}/>
        </Layout>
    );
}
