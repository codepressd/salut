import { Router } from 'express';
import userController from '../controllers/user.controller';
import productController from '../controllers/product.controller';
import cartController from '../controllers/cart.controller';

const router = new Router();

//user routes
router.route('/login').post(userController.login);
router.route('/signup').post(userController.register);
router.route('/updateUser').post(userController.updateUserInfo); //need to make test
router.route('/changePassword').post(userController.changePassword); //need to make test
router.route('/checkUserToken').post(userController.checkUserToken); //need to make test



//product routes supplier
router.route('/postProduct').post(productController.postProduct);//post a new product
router.route('/updateProduct').post(productController.updateProduct);//update an existing Product
router.route('/getSingleProduct/:productId').get(productController.getSingleProduct);//get an existing product info
router.route('/getSupplierProducts').post(productController.getSupplierProducts); //get all supplier products
router.route('/removeProduct/:product_id').delete(productController.removeProduct);//delete product
router.route('/getSupplierOrders/:supplierId').get(cartController.getSupplierOrders);//get all suppliers orders

//product routes restaurant

router.route('/getProducts').get(productController.getProducts);//get all products to display
router.route('/addToCart').post(cartController.addToCart);//add to cart
router.route('/deleteProductFromCart').put(cartController.removeFromCart);//remove from cart
router.route('/sendOrders').post(cartController.sendOrders);// Send out orders from cart
router.route('/getRestOrders/:restId').get(cartController.getRestOrders);// get all restaurants orders
router.route('/getSingleOrder/:restId').get(cartController.getSingleOrder);// get a single restaurants order

export default router;