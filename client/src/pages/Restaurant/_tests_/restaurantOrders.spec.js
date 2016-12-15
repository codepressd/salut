import React from 'react';
import test from 'ava';
import { shallow, mount } from 'enzyme';
import  DashbordOrders from '../pages/restaurantOrders';
import styles from '../restaurant.css';

test('Restaurant Dashboard Orders View Renders Properly', t =>{

	const wrapper = shallow(<DashbordOrders  />);

});