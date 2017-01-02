import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

//Import all API Calls

import getSingleOrder from '../actions/getSingleOrder';
import getSingleProduct from '../actions/getSingleProduct';
import getSupplierOrders from '../actions/getSupplierOrders';
import getSupplierProducts from '../actions/getSupplierProducts';
import postProduct from '../actions/postProduct';
import removeProduct from '../actions/removeProduct';
import updateProduct from '../actions/updateProduct';

describe('Test API Calls To Database', () => {


	it('Supplier Get Single Order', (done) => {
		mock
			.onGet('/api/getSingleOrder/5445')
			.reply(200, {
				orderId: 5445,
				products:[]
			})

		const expectedReply ={
			orderId: 5445,
			products:[]
		};

		axios.get('/api/getSingleOrder/5445')
		.then((res)=>{
			expect(res.data).toEqual(expectedReply);
			done();
		});
		   

	});

	it('Supplier Get Single Product', (done) => {
		mock
			.onGet('/api/getSingleProduct/6789')
			.reply(200, {
				productId: 6789,
				title: 'Product'
			})

		const expectedReply ={
			productId: 6789,
			title: 'Product'
		};

		axios.get('/api/getSingleProduct/6789')
		.then((res)=>{
			expect(res.data).toEqual(expectedReply);
			done();
		});
		   

	});

	it('Supplier Get Supplier Orders', (done) => {
		mock
			.onGet('/api/getSupplierOrders/2345')
			.reply(200, {
				supplierId: 2345,
				orders:[]
			})

		const expectedReply ={
			supplierId: 2345,
			orders:[]
		}

		axios.get('/api/getSupplierOrders/2345')
		.then((res)=>{
			expect(res.data).toEqual(expectedReply);
			done();
		});
		   

	});

	it('Supplier Get Supplier Products', (done) => {
		mock
			.onPost('/api/getSupplierProducts')
			.reply(200,[ {
				supplierId: 2345,
				title:'Product1'
			},
			{
				supplierId: 2345,
				title:'Product2'
			}])

		const expectedReply =[{
				supplierId: 2345,
				title:'Product1'
			},
			{
				supplierId: 2345,
				title:'Product2'
			}]

		axios.post('/api/getSupplierProducts')
		.then((res)=>{
			expect(res.data).toEqual(expectedReply);
			done();
		});
		   

	});

	it('Supplier Post Product', (done) => {
		mock
			.onPost('/api/postProduct')
			.reply(200, {
				message: 'Product Posted Successfully'
			})

		const expectedReply ={
			message: 'Product Posted Successfully'
		}

		axios.post('/api/postProduct', {productId: '11234' })
		.then((res)=>{
			expect(res.data).toEqual(expectedReply);
			done();
		});
		   

	});

	it('Supplier Remove Product', (done) => {
		mock
			.onDelete('/api/removeProduct/5445')
			.reply(200, {
				productId: 5445,
				title:'Product1'
			})

		const expectedReply ={
			productId: 5445,
			title:'Product1'
		}

		axios.delete('/api/removeProduct/5445')
		.then((res)=>{
			expect(res.data).toEqual(expectedReply);
			done();
		});
		   

	});

	it('Supplier Update Product', (done) => {
		mock
			.onPost('/api/updateProduct')
			.reply(200, {
				productId: 5445,
				title: 'Product 1'			
			})

		const expectedReply ={
			productId: 5445,
			title:'Product 1'
		}

		axios.post('/api/updateProduct')
		.then((res)=>{
			expect(res.data).toEqual(expectedReply);
			done();
		});
		   

	});

});

