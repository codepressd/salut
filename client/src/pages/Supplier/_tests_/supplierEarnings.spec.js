import React from 'react';
import test from 'ava';
import { shallow, mount } from 'enzyme';
import  SupplyEarnings from '../pages/supplierEarnings';
import styles from '../supplier.css';

test('Supplier Earnings Renders Properly', t =>{

	const wrapper = shallow(<SupplyEarnings  />);

});