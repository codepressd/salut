import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';

// Import Store

import{configureStore}from '../../../store';
 const store = configureStore(window.__INITIAL_STATE__);

//Import pages
import  ProfilePage from '../pages/profilePage';

describe('Profile Render', () => {


	it('ProfilePage Should Render ', () => {
		shallow(<Provider store={store}><ProfilePage /></Provider>);
		
      	});		   

});