import React from 'react';
import Layout from './edit-layout';
import EditPage from '../../../common/components/article-edition';
import EditCartridgeContent from '../../../common/components/article-edition/edit-cartridge-content';
import {connect} from 'react-redux';

/** Edition page. */
export default connect(
    state => ({connected: state.login.isConnected})
)(function EditArticle({params}) {
    return (
        <Layout Content={<EditCartridgeContent />}>
            <EditPage id={+params.id}/>
        </Layout>
    );
});
