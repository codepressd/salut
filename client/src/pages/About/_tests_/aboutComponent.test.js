import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';

// Import Store

import{configureStore}from '../../../store';
 const store = configureStore(window.__INITIAL_STATE__);

//Import pages
import  About from '../pages/about';

describe('About Page Render', () => {


	it('About Should Render ', () => {
		shallow(<Provider store={store}><About /></Provider>);
		
      	});		   

});