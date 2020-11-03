import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Header from "./index";

configure({adapter: new Adapter()});

describe('Component: Header', () => {
    it('should render component', () => {
        const wrapper = shallow(<Header title="Unit test"/>);

        expect(wrapper).toBeTruthy();
    });

    it('should render correct title', () => {
        const title = "Outlyer";
        const wrapper = shallow(<Header title={title}/>);

        expect(wrapper.text()).toEqual(title);
    });
});
