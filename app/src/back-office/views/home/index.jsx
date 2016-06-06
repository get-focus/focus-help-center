import React from 'react';

//Style


// Components
import {HelpCenterBase} from '../../../common/components/index';
import {ArticleList} from '../../../common/components/article/list';

/** Root component of the back-office app. */
export default function HelpCenter() {
    return (
        <HelpCenterBase>
            <h4>Back office</h4>
            <ArticleList />
            <button className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
                <i className="material-icons">add</i>
            </button>
        </HelpCenterBase>
    );
}