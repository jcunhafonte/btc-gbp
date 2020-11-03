import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Chart from './index';

configure({adapter: new Adapter()});

describe('Component: Chart', () => {
    it('should render component', () => {
        const wrapper = shallow(<Chart/>);

        expect(wrapper).toBeTruthy();
    });
});
