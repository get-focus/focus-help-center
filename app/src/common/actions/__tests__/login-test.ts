import {login, isConnected} from '../login';
import {Action} from '../../actions';

describe('action: login', () => {
    it('should dispatch request then receive actions with correct password', done => {
        chai.expect(login('password')).to.dispatch.actions([{
            type: Action.REQUEST_LOGIN
        }, {
            type: Action.RECEIVE_LOGIN,
            isConnected: true
        }], done);
    });

    it('should dispatch request then failure actions with incorrect password', done => {
        chai.expect(login('yolo')).to.dispatch.actions([{
            type: Action.REQUEST_LOGIN
        }, {
            type: Action.FAILURE_LOGIN,
            error: 'Incorrect password'
        }], done);
    });
});

describe('action: isConnected', () => {
    it('should dispatch request then receive actions', done => {
        chai.expect(isConnected()).to.dispatch.actions([{
            type: Action.REQUEST_LOGIN
        }, {
            type: Action.RECEIVE_LOGIN,
            isConnected: true
        }], done);
    });
});
