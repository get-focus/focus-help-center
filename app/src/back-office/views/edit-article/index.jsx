import Layout from '../../layout';
import {EditPage} from '../../../common/components/article-edition';
import {EditCartridgeContent} from '../../../common/components/article-edition/edit-cartridge-content';
import {TitleComponent} from '../home/title-component';

/** Root component of the back-office app. */
export function EditArticle() {
    return (
        <Layout Content={<EditCartridgeContent />} BarMiddle={<TitleComponent />}>
            <EditPage />
        </Layout>
    );
}
