import React from 'react';
import test from 'ava';
import { shallow, mount } from 'enzyme';
import  SupplyAddProducts from '../pages/supplierAddProducts';
import styles from '../supplier.css';

test('Supplier Add Products Renders Properly', t =>{

	const wrapper = shallow(<SupplyAddProducts  />);

});