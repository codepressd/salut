import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import styles from '../restaurant.css';

// Import Store

import{configureStore}from '../../../store';
 const store = configureStore(window.__INITIAL_STATE__);

//Import pages
import  RestDashboard from '../pages/restaurantDashboard';
import  RestCheckout from '../pages/restaurantCheckout';
import  RestOrders from '../pages/restaurantOrders';
import  RestProductPage from '../pages/restaurantProductPage';
import  RestOrderSuccess from '../pages/orderSuccess';
import  RestShop from '../pages/restaurantShop';
import  RestViewOrder from '../pages/restaurantViewOrder';


//import Components
import  RestCheckOneProduct from '../components/checkoutOneProduct';
import  RestOneOrder from '../components/oneOrder';
import  RestOneProduct from '../components/oneProduct';
import  RestOneSupplier from '../components/oneSupplier';
import  RestProductOrder from '../components/productOrder';
import  RestSideMenu from '../components/sideMenu';

//Individudal Pages Test

describe('Restaurant Pages Render', () => {


	it('RestDashboard Should Render ', () => {
		shallow(<Provider store={store}><RestDashboard /></Provider>);
		
      	});		   

	it('RestCheckout Should Render ', () => {
		
		shallow(<Provider store={store}><RestCheckout /></Provider>);
      	});

	it('RestOrders Should Render ', () => {
		
		shallow(<Provider store={store}><RestOrders /></Provider>);
      	});

	it('RestProductPage Should Render ', () => {
		
		shallow(<Provider store={store}><RestProductPage /></Provider>);
      	});

	it('RestOrderSuccess Should Render ', () => {
		
		shallow(<Provider store={store}><RestOrderSuccess /></Provider>);
      	});

	it('RestShop Should Render ', () => {
		
		shallow(<Provider store={store}><RestShop /></Provider>);
      	});

	it('RestViewOrder Should Render ', () => {
		 shallow(<Provider store={store}><RestViewOrder /></Provider>);
		
      	});


});

//individual Component Tests

describe('Restaurant individual Components Render', () => {


	it('RestCheckOneProduct Should Render ', () => {
		shallow(<Provider store={store}><RestCheckOneProduct /></Provider>);
		
      	});		   

	it('RestOneOrder Should Render ', () => {
		
		shallow(<Provider store={store}><RestOneOrder /></Provider>);
      	});

	it('RestOneProduct Menu Should Render ', () => {
		
		shallow(<Provider store={store}><RestOneProduct /></Provider>);
      	});

	it('RestOneSupplier Should Render ', () => {
		
		shallow(<Provider store={store}><RestOneSupplier /></Provider>);
      	});
	it('RestProductOrder Should Render ', () => {
		
		shallow(<Provider store={store}><RestProductOrder /></Provider>);
      	});

	it('RestSideMenu Should Render ', () => {
		
		shallow(<Provider store={store}><RestSideMenu /></Provider>);
      	});

});