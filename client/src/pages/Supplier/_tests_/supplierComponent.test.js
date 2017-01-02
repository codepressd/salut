import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import styles from '../supplier.css';

// Import Store

import{configureStore}from '../../../store';
 const store = configureStore(window.__INITIAL_STATE__);

//Import pages
import  ProductSuccess from '../pages/productSuccess';
import  AddProducts from '../pages/supplierAddProducts';
import  Dashboard from '../pages/SupplierDashboard';
import  Orders from '../pages/supplierOrders';
import  Products from '../pages/supplierProducts';
import  UpdateProduct from '../pages/supplierUpdateProduct';
import  ViewOrder from '../pages/supplierViewOrder';


//import Components

import  OneOrder from '../components/supplierOneOrder';
import  OneProduct from '../components/SingleProduct';
import  SupplierMenu from '../components/SupplierMenu';
import  ProductOrder from '../components/productOrder';


//Individudal Pages Test

describe('Supplier Pages Render', () => {


	it('ProductSuccess Should Render ', () => {
		shallow(<Provider store={store}><ProductSuccess /></Provider>);
		
      	});		   

	it('AddProducts Should Render ', () => {
		
		shallow(<Provider store={store}><AddProducts /></Provider>);
      	});

	it('Dashboard Should Render ', () => {
		
		shallow(<Provider store={store}><Dashboard /></Provider>);
      	});

	it('Orders Should Render ', () => {
		
		shallow(<Provider store={store}><Orders /></Provider>);
      	});

	it('Products Should Render ', () => {
		
		shallow(<Provider store={store}><Products /></Provider>);
      	});

	it('UpdateProduct Should Render ', () => {
		
		shallow(<Provider store={store}><UpdateProduct /></Provider>);
      	});

	it('ViewOrder Should Render ', () => {
		 shallow(<Provider store={store}><ViewOrder /></Provider>);
		
      	});


});

//individual Component Tests

describe('Supplier individual Components Render', () => {


	it('OneOrder Should Render ', () => {
		shallow(<Provider store={store}><OneOrder /></Provider>);
		
      	});		   

	it('OneProduct Should Render ', () => {
		
		shallow(<Provider store={store}><OneProduct /></Provider>);
      	});

	it('Supplier Menu Should Render ', () => {
		
		shallow(<Provider store={store}><SupplierMenu /></Provider>);
      	});

	it('ProductOrder Should Render ', () => {
		
		shallow(<Provider store={store}><ProductOrder /></Provider>);
      	});

});