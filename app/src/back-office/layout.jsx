import {PropTypes} from 'react';

/** Layout component. */
function Layout({children, BarLeft, BarRight, BarMiddle, Content, actions}) {
    return (
        <div data-focus='layout'>
            <header>
                <div data-focus='header-top-row'>
                    <div data-focus='header-top-row-left'>
                        {BarLeft}
                    </div>
                    <div data-focus='header-top-row-middle'>
                        {BarMiddle}
                    </div>
                    <div data-focus='header-top-row-right'>
                        {BarRight}
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
    children: PropTypes.arrayOf(PropTypes.node),
    BarLeft: PropTypes.node,
    BarMiddle: PropTypes.node,
    BarRight: PropTypes.node,
    Content: PropTypes.arrayOf(PropTypes.node),
    actions: PropTypes.array
};

export default Layout;
