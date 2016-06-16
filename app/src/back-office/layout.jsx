import {Component, PropTypes} from 'react';
import i18n from 'i18next';
import {PasswordComponent} from '../common/components/password';

/** Layout component. */
export default class Layout extends Component {

    static propTypes = {
        BarMiddle: PropTypes.node,
        Content: PropTypes.object,
        actions: PropTypes.object
    };

    componentDidUpdate() {
        componentHandler.upgradeDom();
    }

    checkActions = () => {
        const {actions} = this.props;
        if (actions !== undefined && actions.secondary !== undefined && actions.secondary.length > 0) {
            return true;
        }
    };

    render() {
        const {children, BarMiddle, Content, actions} = this.props;
        return (
            <div data-focus='layout'>
                <header>
                    <div data-focus='header-top-row'>
                        <a data-focus='header-top-row-left' className='mdl-button mdl-js-button'>
                            <i className='material-icons'>exit_to_app</i>
                            <span>{i18n.t('back-office.layout.back-to-app') }</span>
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
                        {actions && actions.primary.map((primary, i) => {
                            const {action, icon} = primary;
                            return (
                                <button
                                    key={i}
                                    className='mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect'
                                    onClick={action}
                                    >
                                    <i className="material-icons">{icon}</i>
                                </button>
                            );
                        }) }
                        {actions && actions.secondary !== undefined ?
                            <button id='demo-menu-lower-right'
                                className='mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect'>
                                <i className='material-icons'>more_vert</i>
                            </button>
                            : <div/>
                        }
                        {this.checkActions() ?
                            <ul className='mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect'
                                htmlFor='demo-menu-lower-right' ref='menu'>
                                {actions.secondary.map((secondary, i) => {
                                    return (
                                        <li className='mdl-menu__item dropdown-item'
                                            key={i}
                                            >
                                            {secondary.label}
                                        </li>
                                    );
                                }) }
                            </ul >
                            : <div />
                        }
                    </div>
                </header>
                <div className='layout-content'>
                    {children}
                </div>
            </div>
        );
    }
}
