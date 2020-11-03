import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';

import App from './index';

configure({adapter: new Adapter()});

describe('Container: App', () => {
    const mockStore = configureStore();
    const initialState = {
        prices: [
            {
                date: new Date(),
                value: '1.5'
            },
            {
                date: new Date(),
                value: '2'
            },
        ],
        fetching: false,
        error: false
    };
    let store;
    let wrapper;

    beforeEach(() => {
        store = mockStore(initialState);
        wrapper = shallow(<App store={store}/>);
    });

    it('should render component', () => {
        expect(wrapper).toBeTruthy();
    });

    it('should render header', () => {
        expect(wrapper.dive().find('.App').text()).toContain('<Header />');
    });

    it('should not render loading', () => {
        expect(wrapper.dive().find(".App__Status").text()).not.toEqual("Loading...")
    });

    it('should render loading when is fetching', () => {
        const initialState = {
            prices: [],
            fetching: true,
            error: false
        };
        store = mockStore(initialState);
        wrapper = shallow(<App store={store}/>);

        expect(wrapper.dive().find(".App__Status").text()).toEqual("Loading...")
    });

    it('should not render error', () => {
        expect(wrapper.dive().find(".App__Status").text()).not.toEqual("Error...")
    });

    it('should render error when has error', () => {
        const initialState = {
            prices: [],
            fetching: false,
            error: true
        };
        store = mockStore(initialState);
        wrapper = shallow(<App store={store}/>);

        expect(wrapper.dive().find(".App__Status").text()).toEqual("Something went wrong...")
    });

    it('should render information', () => {
        expect(wrapper.dive().find('.App').text()).toContain('<Information />');
    });
});
