import {createClass} from 'react';
import {renderIntoDocument, Simulate} from 'react-addons-test-utils';

const VeryFirstDiv = createClass<{click?}, {}>({
    render() {
        const {click} = this.props;
        return (
            <div>
                <span ref='myTest' id='title' onClick={click}>Lovely! Here it is - my very first React component!</span>
            </div>
        );
    }
});

describe('Basic tests', () => {
    describe('React and ReactDom', () => {
        let testComponent;
        before(() => {
            testComponent = renderIntoDocument(<VeryFirstDiv />);
        });
        it('Should have an id named `title`', () => {
            chai.expect(testComponent.refs.myTest.id).to.equal('title');
        });
    });
    describe('Sinon Spy', () => {
        let testComponent, onClickSpy;
        before(() => {
            onClickSpy = sinon.spy();
            function onClickSpan() {
                onClickSpy();
            }
            testComponent = renderIntoDocument(<VeryFirstDiv click={onClickSpan}/>);
            Simulate.click(testComponent.refs.myTest);
        });
        it('Should be called at least once', () => {
            chai.expect(onClickSpy).to.have.been.calledOnce;
        });
    });
});
