import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Information from './index';

configure({adapter: new Adapter()});

describe('Component: Information', () => {
    const prices = [
        {
            value: '20',
            date: new Date()
        },
        {
            value: '10',
            date:
                new Date()
        }
    ];

    it('should render component', () => {
        const wrapper = shallow(<Information prices={prices}/>);

        expect(wrapper).toBeTruthy();
    });

    it('should render empty price', () => {
        const wrapper = shallow(<Information prices={[]}/>);

        expect(wrapper.find('h2').text()).toEqual('£0.00');
    });

    it('should render current price', () => {
        const wrapper = shallow(<Information prices={prices}/>);

        expect(wrapper.find('h2').text()).toEqual('£10.00');
    });

    it('should render arrow down', () => {
        const wrapper = shallow(<Information prices={prices}/>);

        expect(wrapper.find('Arrow').at(0).props().direction).toEqual('down');
    });

    it('should render current percentage', () => {
        const wrapper = shallow(<Information prices={prices}/>);

        expect(wrapper.find('span').at(1).text()).toEqual('-50.00%');
    });
});
