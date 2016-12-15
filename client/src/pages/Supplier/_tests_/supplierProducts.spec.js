import React from 'react';
import test from 'ava';
import { shallow, mount } from 'enzyme';
import  SupplyProducts from '../pages/supplierProducts';
import styles from '../supplier.css';

test('Supplier Products Renders Properly', t =>{

	const wrapper = shallow(<SupplyProducts  />);

});