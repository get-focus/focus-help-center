import React from 'react';
import Layout from '../layouts/edit-layout';
import EditPage from '../../../common/components/article-edition';
import EditCartridgeContent from '../../../common/components/article-edition/edit-cartridge-content';
import {TitleComponent} from '../title-component';
import {Action} from '../../../common/actions/';
import {connect} from 'react-redux';

const actions = {
    primary: [
        {label: 'Print', icon: 'print', clickHandler: () => window.print()},
        {label: 'Delete', icon: 'delete', action: {type: Action.SHOW_POPUP_EDITION}}
    ]
};

/** Edition page. */
export default connect(
    state => ({connected: state.login.isConnected})
)(function EditArticle({params, connected}) {
    return (
        <Layout Content={<EditCartridgeContent />} BarMiddle={<TitleComponent />} actions={connected ? actions : undefined}>
            <EditPage id={+params.id}/>
        </Layout>
    );
});
