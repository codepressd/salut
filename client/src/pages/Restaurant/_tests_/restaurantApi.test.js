import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);


describe('Test API Calls To Database', () => {


	it('Restaurant Add To Cart', (done) => {
		mock
			.onPost('/api/addToCart')
			.reply(200, {
				productId: 5445,
				title: 'Product 1'
			})

		const expectedReply ={
				productId: 5445,
				title: 'Product 1'
			};

		axios.post('/api/addToCart', {productId: 5445})
		.then((res)=>{
			expect(res.data).toEqual(expectedReply);
			done();
		});
		   

	});

	it('Restaurant Delete Product from Cart', (done) => {
		mock
			.onPut('/api/deleteProductFromCart')
			.reply(200, {
				productId: 6789,
				message: 'Product Removed'
			})

		const expectedReply ={
			productId: 6789,
			message: 'Product Removed'
		};

		axios.put('/api/deleteProductFromCart', {productId: 6789})
		.then((res)=>{
			expect(res.data).toEqual(expectedReply);
			done();
		});
		   

	});

	it('Restaurant Get Products', (done) => {
		mock
			.onGet('/api/getProducts/')
			.reply(200, {
				products:[]
			})

		const expectedReply ={
			products:[]
		}

		axios.get('/api/getProducts/')
		.then((res)=>{
			expect(res.data).toEqual(expectedReply);
			done();
		});
		   

	});

	it('Restaurant Get Restaurant Orders', (done) => {
		mock
			.onGet('/api/getRestOrders/2345')
			.reply(200,[ {
				RestaurantId: 2345,
				orderId:'123898'
			},
			{
				RestaurantId: 2345,
				orderId:'123456'
			}])

		const expectedReply =[{
				RestaurantId: 2345,
				orderId:'123898'
			},
			{
				RestaurantId: 2345,
				orderId:'123456'
			}]

		axios.get('/api/getRestOrders/2345')
		.then((res)=>{
			expect(res.data).toEqual(expectedReply);
			done();
		});
		   

	});

	it('Restaurant Single Order', (done) => {
		mock
			.onGet('/api/getSingleOrder/45678')
			.reply(200, {
				orderId: 45678,
				products: [{
					productId: 4321,
					title: 'product 3'
				}]
			})

		const expectedReply ={
				orderId: 45678,
				products: [{
					productId: 4321,
					title: 'product 3'
				}]
			}

		axios.get('/api/getSingleOrder/45678')
		.then((res)=>{
			expect(res.data).toEqual(expectedReply);
			done();
		});
		   

	});

	it('Restaurant Send Order', (done) => {
		mock
			.onPost('/api/sendOrders')
			.reply(200, {
				orderId: 5665,
				message:'Order Placed Successfully'
			})

		const expectedReply ={
			orderId: 5665,
			message:'Order Placed Successfully'
		}

		axios.post('/api/sendOrders',{orderId: 5665})
		.then((res)=>{
			expect(res.data).toEqual(expectedReply);
			done();
		});
		   

	});

});