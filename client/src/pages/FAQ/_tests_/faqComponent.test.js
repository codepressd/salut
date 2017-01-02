import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';

// Import Store

import{configureStore}from '../../../store';
 const store = configureStore(window.__INITIAL_STATE__);

//Import pages
import  FAQ from '../pages/faq';

describe('FAQ Page  Render', () => {


	it('FAQ Should Render ', () => {
		shallow(<Provider store={store}><FAQ /></Provider>);
		
      	});		   

});