import Layout from '../layout';
import EditPage from '../../common/components/article-edition';
import EditCartridgeContent from '../../common/components/article-edition/edit-cartridge-content';
import {TitleComponent} from './home/title-component';
import {Action} from '../../common/actions/';

const actions = {
    primary: [
        {label: 'Print', icon: 'print', clickHandler: () => window.print()},
        {label: 'Delete', icon: 'delete', action: {type: Action.SHOW_POPUP_EDITION}}
    ]
};

/** Edition page. */
export function EditArticle({params}) {
    return (
        <Layout Content={<EditCartridgeContent />} BarMiddle={<TitleComponent />} actions={actions}>
            <EditPage id={+params.id}/>
        </Layout>
    );
}
