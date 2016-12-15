import React from 'react';
import test from 'ava';
import { shallow, mount } from 'enzyme';
import  DashbordShop from '../pages/restaurantShop';
import styles from '../restaurant.css';

test('Restaurant Dashboard Shop View Renders Properly', t =>{

	const wrapper = shallow(<DashbordShop />);

});