import Product from '../models/product';
import serverConfig from '../config/database';
import mongoose from 'mongoose';


function setProductInfo(req){
	return{
		_id: req._id,
		title: req.title,
		description: req.description,
		singlePrice: req.price.single,
		casePrice: req.price.case,
		category: req.category,
		imageurl: req.image,
		supplier: req.supplier,
		supplier: req.supplierId
	}
}


exports.postProduct = function(req, res, next){
	
	const {supplierId, supplier, productName, unitPrice, casePrice, productDescription, productType, image} = req.body;
	if(!productName){
		return res.status(422).send({ productName: 'You must enter a Product Name.' });
	}
	if(!unitPrice){
		return res.status(422).send({ unitPrice: 'You must enter a Unit Price.' });
	}
	if(!casePrice){
		return res.status(422).send({ casePrice: 'You must enter an Case Price.' });
	}
	if(!productDescription){
		return res.status(422).send({ productDescription: 'You must enter a Product Description.' });
	}
	if(!productType){
		return res.status(422).send({ productType: 'You must enter a Product Type.' });	
	}

	let product = new Product ({
		title: productName,
		description: productDescription,
		price: {
			single: unitPrice,
			case: casePrice
		},
		category: productType,
		image: image,
		supplierId: supplierId,
		supplier: supplier
	});
	product.save(function(err, user){
		if(err){
			return next(err);
		}

		let productInfo = setProductInfo(user);
		res.status(201).json({
			product: productInfo
		})
	})
}

exports.getSupplierProducts = function(req, res, next){

	const supplyId = req.body.userId;

	Product.find({supplierId :  supplyId}, function(err, products){
		if (err){
			return next(err);
		}

		res.status(201).json({products: products});

	});	
}

exports.getSingleProduct = function(req, res, next){

	Product.findOne({
		_id: req.params.productId
	}, function(err, product){
		if(err){
			return next(err);
		}

		res.status(201).json({product: product});
	})


}

exports.updateProduct = function(req, res, next){

	const {supplierId, productId, supplier, productName, unitPrice, casePrice, productDescription, productType, image} = req.body;
	const updatedProduct = {
		title: productName,
		description: productDescription,
		price: {
			single: unitPrice,
			case: casePrice
		},
		category: productType,
		image: image,
		supplierId: supplierId,
		supplier: supplier
	};

	Product.findOneAndUpdate({
		_id: productId 
	},{ $set: updatedProduct}, {new: true}, function(err, product){
		if(err){
			return next(err);
		}
		res.status(201).json({message: 'Product Successfully Updated!'});
	})
}

exports.removeProduct = function(req, res, next){
	Product.remove({

		_id: req.params.product_id

	}, function(err, product){
		if(err){
			return next(err);
		}
		res.status(201).json({message: 'Product Successfully Deleted!'});
	})
}

//For Restaurant side

exports.getProducts = function(req, res, next){

	Product.find({}, function(err, product){
		if(err){
			return next(err);
		}

		res.status(201).json({products: product});
	})
}

exports.getProductCategory = function(req, res, next){
	let query={
		category: req.body.category
	};
	
	if(req.body.category === 'all products'){
		query = {}
		
	}
	
	Product.find(query, function(err, product){
		if(err){
			return next(err);
		}

		res.status(201).json({products: product});
	})
}


