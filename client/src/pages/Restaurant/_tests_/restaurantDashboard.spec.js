import React from 'react';
import test from 'ava';
import { shallow, mount } from 'enzyme';
import  RestDashboard from '../pages/restaurantDashboard';
import styles from '../restaurant.css';

test('Restaurant Dashboard Renders Properly', t =>{

	const wrapper = shallow(<RestDashboard  />);

});