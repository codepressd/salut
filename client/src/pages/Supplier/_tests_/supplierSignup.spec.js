import React from 'react';
import test from 'ava';
import { shallow, mount } from 'enzyme';
import  SupplySignup from '../pages/supplierSignup';
import styles from '../supplier.css';

test('Supplier Signup Renders Properly', t =>{

	const wrapper = shallow(<SupplySignup  />);

});