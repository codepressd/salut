global.DATABASE_URL = 'mongodb://localhost:27017/salut-dev-test';
//mocha --compilers js:babel-core/register
var chai = require('chai');
var chaiHttp = require('chai-http');

var server = require('../server.js');

//Models
var Cart = require( '../server/models/cart.js');
var Order=  require( '../server/models/orders.js');
var Product =  require( '../server/models/product.js');
var Users = require( '../server/models/users.js');



var should = chai.should();
var app = server.app;

chai.use(chaiHttp);

//Test User routes
describe('Test User Functions', function(){
    this.timeout(30000);
    before(function (done){
       server.runServer(function() {
            Users.create([
                {email: 'chris@chris.com',
                 username: 'Chris',
                 password: '$2a$05$zdCJkPSXv.yWDnp/lHWbIunXu3vUxeAYiBhqG0uFAwaz4s7Z1msbm',
                 role: 'restaurant',
                 profile: {
                 		firstName: 'Chris',
                 		lastName: 'Reeder',
                 		companyName: 'someCompany',
		address: '123 home street',
		city: 'Reno',
		state: 'Nevada',
		region: 'northNevada',
		businessType: 'restaurant'
                 		}
                },
                {email: 'new@grace.com',
                 username: 'newNew',
                 password: '$2a$08$OXkCdXiDs56JpYKdGhqUc.oghOniFC2lh51hEpcdVSjEBFvctqVpS',
                 role: 'supplier',
                 profile: {
                 		firstName: 'new',
                 		lastName: 'dude',
                 		companyName: 'supply Company',
		address: '789 home street',
		city: 'Reno',
		state: 'Nevada',
		region: 'northNevada',
		businessType: 'supplier'
                
                 		}
                },
                {email: 'chris@jeff.com',
                 username: 'kris',
                 password: '$2a$08$OXkCdXiDs56JpYKdGhqUc.oghOniFC2lh51hEpcdVSjEBFvctqVpS',
                 role: 'supplier',
                 profile: {
                 		firstName: 'Kris',
                 		lastName: 'something',
                 		companyName: 'A Company',
		address: '456 home street',
		city: 'Reno',
		state: 'Nevada',
		region: 'northNevada',
		businessType: 'supplier'
                 		}
                }], function(err) {
                            if(err){
                               return console.error(err);
                            }
                            
                done();
            });
        }); 
    });
    
    
    it('Create New User with data', function(done) {
        chai.request(app)
            .post('/api/signup')
            .send({
                 email: 'chris@gmailer.com',
                 password: '12345',
                 firstName: 'Chris',
                 lastName: 'Reeder',
                 companyName:'Beaujolais',
                 address: '753 riverside dr',
                 city: 'Reno',
                 state:'Nevada',
                 region:'northNevada',
                 businessType: 'restaurant',
                 role: 'restaurant'
             })
            .end(function(err, res) {
              should.equal(err, null);
              res.should.have.status(201);
              res.body.token.should.be.a('string');
              res.body.user.role.should.equal('restaurant');
              res.body.user.email.should.equal('chris@gmailer.com');
                done();
            });
    });

    it('Create New User fail missing email', function(done) {
        chai.request(app)
            .post('/api/signup')
            .send({
                 password: '12345',
                 firstName: 'Chris',
                 lastName: 'Reeder',
                 companyName:'Beaujolais',
                 address: '753 riverside dr',
                 city: 'Reno',
                 state:'Nevada',
                 region:'northNevada',
                 businessType: 'restaurant',
                 role: 'restaurant'
             })
            .end(function(err, res) {
              res.should.have.status(422);
              res.body.email.should.equal('You must enter an email address.');
                done();
            });
    });
    
    it('login user ', function(done){
        chai.request(app)
             .post('/api/login')
             .send({email: 'chris@chris.com', password: '$2a$05$zdCJkPSXv.yWDnp/lHWbIunXu3vUxeAYiBhqG0uFAwaz4s7Z1msbm'})
             .end(function(err, res){
                  should.equal(err, null);
                  res.should.have.status(201);
                  res.body.user.firstName.should.equal('Chris');
                  res.body.user.lastName.should.equal('Reeder');
                  res.body.user.role.should.equal('restaurant');
                  done();
        });
        
    });

    it('login user can not find email ', function(done){
        chai.request(app)
             .post('/api/login')
             .send({email: 'chris@someone.com', password: '$2a$05$zdCJkPSXv.yWDnp/lHWbIunXu3vUxeAYiBhqG0uFAwaz4s7Z1msbm'})
             .end(function(err, res){
                  res.should.have.status(422);
                  res.body.email.should.equal('Can\'t find that email');
                  done();
        });
        
    });

    it('login user - Incorrect Password', function(done){
        chai.request(app)
             .post('/api/login')
             .send({email: 'chris@chris.com', password: '$2a$05$zd67666v.yWDnp/lHWbIunXu3vUxeAYiBhqG0uFAwaz4s7Z1msbm'})
             .end(function(err, res){
                  res.should.have.status(422);
                  res.body.password.should.equal('Incorrect Password');
                  done();
        });
        
    });
    
    
    //removes user info at end
    after(function(done) {
        Users.remove(function() {
            done();
        });
    });
});

//test Product routes 

describe('Test Product functions', function(){
    this.timeout(30000);
    before(function (done){
       server.runServer(function() {
            Product.create([
                {title: 'Great Wine',
                 description: 'This stuff tastes great',
                  price: {
                    single: '12',
                    case: '56',
                  },
                  category:'wine',
                  image: '',
                  supplier: 'Breakthru',
                  supplierId: '112233'
                },
                {title: 'Hanger Steak',
                 description: 'This is a great steak',
                  price: {
                    single: '12',
                    case: '250',
                  },
                  category:'meat',
                  image: '',
                  supplier: 'Sierra Meats',
                  supplierId: '223344'
                },
                {title: 'Yellow Onion',
                 description: 'It will make you cry',
                  price: {
                    single: '1',
                    case: '25',
                  },
                  category:'produce',
                  image: '',
                  supplier: 'Produce Plus',
                  supplierId: 'Nevada'
                }], function(err) {
                            if(err){
                               return console.error(err);
                            }
                            
                done();
            });
        }); 
    });
    
    let newProduct ={}; 
    it('Create New Product', function(done) {
        chai.request(app)
            .post('/api/postProduct')
            .send({
                  productName: 'New Wine',
                  productDescription: 'This stuff tastes great',
                  unitPrice: '16',
                  casePrice: '250',
                  productType:'wine',
                  image: '',
                  supplier: 'Breakthru',
                  supplierId: '112233'
             })
            .end(function(err, res) {
                  should.equal(err, null);
                  res.should.have.status(201);
                  res.body.product.should.be.a('object');
                  res.body.product.title.should.equal('New Wine');
                  newProduct = res.body;
                  done();
            });
    });
   
    it('Update Product', function(done) {
        chai.request(app)
            .post('/api/updateProduct')
            .send({
                  productId: newProduct.product._id,
                  productName: 'New Updated Wine',
                  productDescription: 'This stuff tastes great',
                  unitPrice: '16',
                  casePrice: '250',
                  productType:'wine',
                  image: '',
                  supplier: 'Breakthru',
                  supplierId: '112233'
             })
            .end(function(err, res) {
                  should.equal(err, null);
                  res.should.have.status(201);
                  res.body.message.should.equal('Product Successfully Updated!');

                  done();
            });
    });

    it('Get Single Product', function(done) {
        chai.request(app)
            .get('/api/getSingleProduct/'+ newProduct.product._id)
            .end(function(err, res) {
                  should.equal(err, null);
                  res.should.have.status(201);
                  res.body.product.title.should.equal('New Updated Wine');
                  done();
            });
    });

    it('Get All Supplier Products', function(done) {
        chai.request(app)
            .post('/api/getSupplierProducts')
            .send({
                  userId: '112233'
            })
            .end(function(err, res) {
                  should.equal(err, null);
                  res.should.have.status(201);
                  res.body.products.length.should.equal(2);
                  res.body.products[0].supplierId.should.equal('112233');
                  done();
            });
    });

    it('Remove Single Product', function(done) {
        chai.request(app)
            .delete('/api/removeProduct/'+newProduct.product._id)
            .end(function(err, res) {
                  should.equal(err, null);
                  res.should.have.status(201);
                  res.body.message.should.equal('Product Successfully Deleted!');
                  done();
            });
    });

    it('Get all Products', function(done) {
        chai.request(app)
            .get('/api/getProducts/')
            .end(function(err, res) {
                  should.equal(err, null);
                  res.should.have.status(201);
                  res.body.products.length.should.equal(3);
                  done();
            });
    });

    
    
    //removes product info at end
    after(function(done) {
        Product.remove(function() {
            done();
        });
    });
});

//Test Order Functions

describe('Test Order functions', function(){
    this.timeout(30000);
    before(function (done){
       server.runServer(function() {
            Order.create([
                {userId: 'user1',
                  usersId: 'user1',
                 orderTotal: {
                        subtotal: '34',
                        tax: '8.90',
                        total:'56'
                 },
                  orderNumber: '1234',
                  orderDate: '12/07/2016',
                  products: [{
                        title: 'Great Wine',
                        description: 'This stuff tastes great',
                        price: {
                          single: '12',
                          case: '56',
                        },
                        category:'wine',
                        image: '',
                        supplier: 'Breakthru',
                        supplierId: '112233'
                }],
                  suppliers:['112233'],
                },
                {userId: 'user2',
                  usersId: 'user2',
                 orderTotal: {
                        subtotal: '34',
                        tax: '8.90',
                        total:'56'
                 },
                  orderNumber: '3454',
                  orderDate: '12/08/2016',
                  products: [{
                        title: 'Great Wine',
                        description: 'This stuff tastes great',
                        price: {
                          single: '12',
                          case: '56',
                        },
                        category:'wine',
                        image: '',
                        supplier: 'Breakthru',
                        supplierId: '112233'
                },
                {      title: 'Hanger Steak',
                         description: 'This is a great steak',
                        price: {
                          single: '12',
                          case: '250',
                        },
                        category:'meat',
                        image: '',
                        supplier: 'Sierra Meats',
                        supplierId: '223344'
                }],
                  suppliers:['112233', '223344'],
                },
                {userId: 'user3',
                usersId: 'user3',
                 orderTotal: {
                        subtotal: '34',
                        tax: '8.90',
                        total:'56'
                 },
                  orderNumber: '16754',
                  orderDate: '12/05/2016',
                  products: [{
                        title: 'Yellow Onion',
                        description: 'This stuff tastes great',
                        price: {
                          single: '12',
                          case: '56',
                        },
                        category:'wine',
                        image: '',
                        supplier: 'Breakthru',
                        supplierId: '112233'
                }],
                  suppliers:['112233'],
                }], function(err) {
                            if(err){
                               return console.error(err);
                            }
                            
                done();
            });
        }); 
    });
    
    it('Get all Supplier Orders', function(done) {
        chai.request(app)
            .get('/api/getSupplierOrders/223344')
            .end(function(err, res) {
                  should.equal(err, null);
                  res.should.have.status(201);
                  res.body.orders.length.should.equal(1);
                  res.body.orders[0].products.length.should.equal(2);
                  res.body.orders[0].products[1].supplierId.should.equal('223344');
                  done();
            });
    });

    it('Get all Restaurant Orders', function(done) {
        chai.request(app)
            .get('/api/getRestOrders/user2')
            .end(function(err, res) {
                  should.equal(err, null);
                  res.should.have.status(201);
                  res.body.orders[0].usersId.should.equal('user2');
                  done();
            });
    });

    it('Get Single Order', function(done) {
        chai.request(app)
            .get('/api/getSingleOrder/16754')
            .end(function(err, res) {
                  should.equal(err, null);
                  res.should.have.status(201);
                  res.body.orderNumber.should.equal('16754');
                  done();
            });
    });

    it('Send Orders', function(done) {
        chai.request(app)
            .post('/api/sendOrders')
            .send({
                userId: 'user4',
                usersId: 'user4',
                 orderTotal: {
                        subtotal: '34',
                        tax: '8.90',
                        total:'56'
                 },
                  orderNumber: '88854',
                  orderDate: '12/04/2016',
                  products: [{
                        title: 'Yellow Onion',
                        description: 'This stuff tastes great',
                        price: {
                          single: '12',
                          case: '56',
                        },
                        category:'wine',
                        image: '',
                        supplier: 'Breakthru',
                        supplierId: '112233'
                }],
                  suppliers:['112233'],
                })
            .end(function(err, res) {
                  should.equal(err, null);
                  res.should.have.status(201);
                  res.body.message.should.equal( 'Order added successfully and Cart Removed');
                  done();
            });
    });

    it('Get Single Order Confirm Orders were Sent', function(done) {
        chai.request(app)
            .get('/api/getSingleOrder/88854')
            .end(function(err, res) {
                  should.equal(err, null);
                  res.should.have.status(201);
                  res.body.orderNumber.should.equal('88854');
                  done();
            });
    });


    
    
    //removes product info at end
    after(function(done) {
        Order.remove(function() {
            done();
        });
    });
});

describe('Test Cart functions', function(){
    this.timeout(30000);
    before(function (done){
       server.runServer(function() {
            Cart.create([
                {userId: 'user2',
                  usersId: 'user2',
                products: [{
                        title: 'Great Wine',
                        productId:'4567',
                        description: 'This stuff tastes great',
                        price: {
                          single: '12',
                          case: '56',
                        },
                        category:'wine',
                        image: '',
                        supplier: 'Breakthru',
                        supplierId: '112233'
                },
                {      title: 'Hanger Steak',
                        productId: '1234',
                         description: 'This is a great steak',
                        price: {
                          single: '12',
                          case: '250',
                        },
                        category:'meat',
                        image: '',
                        supplier: 'Sierra Meats',
                        supplierId: '223344'
                }]
                }], function(err) {
                            if(err){
                               return console.error(err);
                            }
                            
                done();
            });
        }); 
    });

    it('Add to Cart', function(done) {
        chai.request(app)
            .post('/api/addToCart')
            .send({      
                        title: 'New One',
                        userId:'user2',
                        productId: '5678',
                         description: 'This is a great steak',
                        price: {
                          single: '12',
                          case: '250',
                        },
                        category:'meat',
                        image: '',
                        supplier: 'Sierra Meats',
                        supplierId: '223344'
                })
            .end(function(err, res) {
                  should.equal(err, null);
                  res.should.have.status(201);
                  res.body.length.should.equal(3);
                  res.body[2].title.should.equal('New One');
                  done();
            });
    });

    it('Remove from Cart', function(done) {
        chai.request(app)
            .put('/api/deleteProductFromCart')
            .send({                        
                         userId:'user2',
                        productId: '5678',
                })
            .end(function(err, res) {
                  should.equal(err, null);
                  res.should.have.status(201);
                  res.body.nModified.should.equal(1);
                  done();
            });
    });


    //removes product info at end
    after(function(done) {
        Cart.remove(function() {
            done();
        });
    });
});