import React from 'react';
import test from 'ava';
import { shallow, mount } from 'enzyme';
import  DashbordSuppliers from '../pages/restaurantSuppliers';
import styles from '../restaurant.css';

test('Restaurant Dashboard Suppliers View Renders Properly', t =>{

	const wrapper = shallow(<DashbordSuppliers  />);

});