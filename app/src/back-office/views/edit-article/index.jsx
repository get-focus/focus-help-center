import Layout from '../../layout';
import {EditPage} from '../../../common/components/article-edition/index';
import {EditCartridgeContent} from '../../../common/components/article-edition/edit-cartridge-content';

/** Root component of the back-office app. */
export function EditArticle() {
    return (
        <Layout Content={<EditCartridgeContent />}>
            <EditPage />
        </Layout>
    );
}
