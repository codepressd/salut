import React from 'react';
import test from 'ava';
import { shallow, mount } from 'enzyme';
import  SupplyDashboard from '../pages/supplierDashboard';
import styles from '../supplier.css';

test('Supplier Dashboard Renders Properly', t =>{

	const wrapper = shallow(<SupplyDashboard  />);

});