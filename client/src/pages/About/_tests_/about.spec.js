import React from 'react';
import test from 'ava';
import { shallow, mount } from 'enzyme';
import  About from '../pages/about';
import styles from '../about.css';

test('About Renders Properly', t =>{

	const wrapper = shallow(<About  />);

});