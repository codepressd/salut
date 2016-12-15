import React from 'react';
import test from 'ava';
import { shallow, mount } from 'enzyme';
import Login from '../pages/login';
import styles from '../login.css';

test('Login Renders Properly', t =>{

	const wrapper = shallow(<Login />);

});