import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Arrow from './index';

configure({adapter: new Adapter()});

describe('Component: Arrow', () => {
    it('should render component', () => {
        const wrapper = shallow(<Arrow direction="up"/>);

        expect(wrapper).toBeTruthy();
    });

    it('should render className up', () => {
        const wrapper = shallow(<Arrow direction="up"/>);

        expect(wrapper.find(".Arrow").hasClass("Arrow--up")).toBeTruthy();
    });

    it('should render className down', () => {
        const wrapper = shallow(<Arrow direction="down"/>);

        expect(wrapper.find(".Arrow").hasClass("Arrow--down")).toBeTruthy();
    });
});
