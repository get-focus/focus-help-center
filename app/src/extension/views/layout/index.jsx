import {Component, PropTypes} from 'react';
import i18n from 'i18next';
import {PasswordComponent} from '../../../common/components/password';
import {connect} from 'react-redux';
import {FlatButton, FloatingActionButton, Popover, Menu, MenuItem} from 'material-ui';

/** Layout component. */
@connect()
export default class Layout extends Component {

    static propTypes = {
        BarMiddle: PropTypes.node,
        Content: PropTypes.object,
        actions: PropTypes.object
    };

    state = {open: false};

    checkActions = () => {
        const {actions} = this.props;
        if (actions !== undefined && actions.secondary !== undefined && actions.secondary.length > 0) {
            return true;
        }
    };

    togglePopover = (e) => this.setState({open: !this.state.open, anchorEl: e.currentTarget});

    render() {
        const {children, BarMiddle, Content, actions} = this.props;
        return (
            <div className='layout'>
                <header>
                        <div className='left'>

                        </div>
                        <div className='middle'>
                            {BarMiddle}
                        </div>
                        <div className='right' style={{textAlign: 'right'}}>
                            <FlatButton
                                icon={<i className='material-icons'>open_in_new</i>}
                                onClick={() => window.open('http://localhost:9999')}
                            />
                        </div>
                    {Content}
                    <div className='actions'>
                        {actions && actions.primary.map(({clickHandler, icon, action}, i) => (
                            <FloatingActionButton
                                secondary={true}
                                key={i}
                                onClick={action ? () => this.props.dispatch(action) : clickHandler}
                                style={{margin: '0 3px'}}
                            >
                                <i className="material-icons">{icon}</i>
                            </FloatingActionButton>
                        ))}
                        {actions && actions.secondary !== undefined ?
                            <FloatingActionButton
                                secondary={true}
                                onClick={this.togglePopover}
                                style={{margin: '0 3px'}}
                            >
                                <i className="material-icons">more_vert</i>
                            </FloatingActionButton>
                        : null}
                        {this.checkActions() ?
                            <Popover
                                open={this.state.open}
                                anchorEl={this.state.anchorEl}
                                anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                                targetOrigin={{horizontal: 'left', vertical: 'top'}}
                                onRequestClose={this.togglePopover}
                            >
                                <Menu>
                                    {actions.secondary.map(({action, clickHandler, label}, i) => (
                                        <MenuItem
                                            key={i}
                                            primaryText={label}
                                            onClick={action ? () => this.props.dispatch(action) : clickHandler}
                                        />
                                    ))}
                                </Menu>
                            </Popover>
                        : null}
                    </div>
                </header>
                <div className='content'>
                    {children}
                </div>
            </div>
        );
    }
}
