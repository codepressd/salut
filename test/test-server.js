global.DATABASE_URL = 'mongodb://localhost:27017/salut-dev-test';
//mocha --compilers js:babel-core/register
var chai = require('chai');
var chaiHttp = require('chai-http');

var server = require('../server.js');

//Models
var Cart = require( '../server/models/cart.js');
var Orders =  require( '../server/models/orders.js');
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
    
    
    //removes user info at end
    after(function(done) {
        Users.remove(function() {
            done();
        });
    });
});

//test Product routes for Supplier

describe('Test Supplier Product functions', function(){
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
                  done();
            });
    });
    
    it('Update Product', function(done) {
        chai.request(app)
            .post('/api/updateProduct')
            .send({
                  productId: '586c8e04863d764f20a2b068',
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
            .get('/api/getSingleProduct/586c8e04863d764f20a2b068')
            .end(function(err, res) {
                  should.equal(err, null);
                  res.should.have.status(201);
                  console.log(res);
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