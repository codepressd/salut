import React from 'react';
import test from 'ava';
import { shallow, mount } from 'enzyme';
import  SupplyOrders from '../pages/supplierOrders';
import styles from '../supplier.css';

test('Supplier Orders Renders Properly', t =>{

	const wrapper = shallow(<SupplyOrders  />);

});