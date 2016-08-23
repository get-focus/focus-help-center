/// <reference types="mocha" />

import * as React from 'react';
import {shallow} from 'enzyme';
import {EditPage} from '../';
import {IconButton} from 'material-ui';

describe('Edition Page', () => {
    describe('When the component is displayed', () => {
        let component = shallow(<EditPage getArticle={() => null} clearArticle={() => null} connected={true} article={{content: ''}} />);
        it('Should have an hidden left panel', () => {
            chai.expect(component.find('.parameter-panel .hidden')).to.have.length(1);
        });
        it('Should have a visible label on parameter button zone', () => {
            chai.expect(component.find('.text.hidden')).to.have.length(0);
        });
    });
    describe('When the settings button is pressed', () => {
        let component = shallow(<EditPage getArticle={() => null} clearArticle={() => null} connected={true} article={{content: ''}} />);
        it('Should have an opened left panel', () => {
            component.find('.parameter-drawer').find(IconButton).simulate('click');
            chai.expect(component.find('.parameter-panel .hidden')).to.have.length(0);
        });
        it('Should have a hidden label on parameter button zone', () => {
            chai.expect(component.find('.text.hidden')).to.have.length(1);
        });
    });
});
