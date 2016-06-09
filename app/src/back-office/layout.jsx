import {PropTypes} from 'react';
import i18n from 'i18next';
import {PasswordComponent} from '../common/components/password';

/** Layout component. */
function Layout({children, BarMiddle, Content, actions}) {
    return (
        <div data-focus='layout'>
            <header>
                <div data-focus='header-top-row'>
                    <a data-focus='header-top-row-left' className='mdl-button mdl-js-button'>
                        <i className='material-icons'>exit_to_app</i>
                        <span>{i18n.t('back-office.layout.back-to-app')}</span>
                    </a>
                    <div data-focus='header-top-row-middle'>
                        {BarMiddle}
                    </div>
                    <div data-focus='header-top-row-right'>
                        <PasswordComponent />
                    </div>
                </div>
                {Content}
                <div data-focus='header-actions'>
                    {actions && actions.map(primary => {
                        const {action, icon} = primary;
                        return (
                            <div
                                className="mdl-button mdl-js-button mdl-button--fab"
                                onClick={action}
                            >
                                <i className="material-icons">{icon}</i>
                            </div>
                        );
                    })}
                </div>
            </header>
            <div className='layout-content'>
                {children}
            </div>
        </div>
    );
}

Layout.propTypes = {
    BarMiddle: PropTypes.node,
    Content: PropTypes.arrayOf(PropTypes.node),
    actions: PropTypes.array
};

export default Layout;
