import {Component} from 'react';
import {connect} from 'react-redux';
import {isConnected, login, logout, clearError} from '../actions/login';

@connect(
    state => ({
        loading: state.login.isLoading,
        connected: state.login.isConnected,
        error: state.login.error
    }),
    dispatch => ({
        isConnected: () => dispatch(isConnected()),
        login: password => dispatch(login(password)),
        logout: () => dispatch(logout()),
        clearError: () => dispatch(clearError())
    })
)
export class PasswordComponent extends Component {

    login = () => {
        if (this.props.connected) {
            this.props.logout();
        } else {
            this.props.login(this.refs.input.value);
        }
    }

    componentWillMount() {
        const {isConnected, connected} = this.props;
        if (!connected) {
            isConnected();
        }
    }

    render() {
        const {loading, connected, error, clearError} = this.props;
        return (
            <div>
                <div
                    style={!loading ? {display: 'none'} : {}}
                    className={`mdl-spinner mdl-spinner--single-color mdl-js-spinner ${loading ? 'is-active' : ''}`}
                />
                {error ?
                    <div className='mdl-button mdl-js-button' onClick={clearError}><i className='material-icons'>error</i>{error}</div>
                : <div>
                    {connected ?
                        <span>Connecté</span>
                        : <div className="mdl-textfield mdl-js-textfield">
                            <input style={{padding: 0}} ref='input' className="mdl-textfield__input" type="password" id="id" />
                            <label className="mdl-textfield__label" htmlFor="id" />
                        </div>
                    }
                    <button
                        className='mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect'
                        onClick={this.login}
                    >
                        <i className="material-icons">{connected ? 'close' : 'arrow_forward'}</i>
                    </button>
                    </div>
                }

            </div>
        );
    }
}
