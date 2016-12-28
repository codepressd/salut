import Cart from '../models/cart';
import User from '../models/users';
import Orders from '../models/orders';
import mongoose from 'mongoose';

mongoose.Promise = Promise;

exports.addToCart = function(req, res, next){

    const addedProduct = req.body;
   
    Cart.findOneAndUpdate({
        usersId: addedProduct.userId
    },{ $push: {products: addedProduct}}, {new: true}, function(err, product){
        if(err){
            return next(err);
        }
        res.status(201).json(product.products);
    })

}
exports.removeFromCart= function(req, res, next){

    const removedProductInfo = req.body;
   
	    Cart.update({
	        usersId: removedProductInfo.userId
	    },{ $pull: { 'products': {productId :  removedProductInfo.productId } }}, {new: true}, function(err, data){
	        if(err){
	            return next(err);
	        }
	        res.status(201).json(data);
	    })
}

exports.sendOrders= function(req, res, next){

   	 const usersOrder= req.body;

   	  Orders.findOneAndUpdate({
	        usersId: usersOrder.userId
	    },{ $push: {orders: usersOrder}}, {new: true}).exec()
   	  .then(function(orders){
   	  	Cart.findOneAndUpdate({
	        		usersId: usersOrder.userId
	   	 },{ $set: { products: []}}, {new: true}).exec()
   	  	.then(function(cart){
   	  		res.status(201).json(cart);
   	  	})
   	  })

}

exports.getRestOrders= function(req, res, next){

   	 const restId= req.params.restId;
   	 console.log(restId);

   	Orders.findOne({
   		usersId : restId
   	},function(err, orders){
		if (err){
			return next(err);
		}

		res.status(201).json({orders: orders.orders});
	});

}