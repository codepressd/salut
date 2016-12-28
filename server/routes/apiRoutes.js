import { Router } from 'express';
import userController from '../controllers/user.controller';
import productController from '../controllers/product.controller';
import cartController from '../controllers/cart.controller';

const router = new Router();

//user routes
router.route('/login').post(userController.login);
router.route('/signup').post(userController.register);

//product routes supplier
router.route('/postProduct').post(productController.postProduct);//post a new product
router.route('/updateProduct').post(productController.updateProduct);//update an existing Product
router.route('/getSingleProduct/:productId').get(productController.getSingleProduct);//get an existing product info
router.route('/getSupplierProducts').post(productController.getSupplierProducts); //get all supplier products
router.route('/removeProduct/:product_id').delete(productController.removeProduct);//delete product

//product routes restaurant

router.route('/getProducts').get(productController.getProducts);
router.route('/addToCart').post(cartController.addToCart);
router.route('/deleteProductFromCart').put(cartController.removeFromCart);
router.route('/sendOrders').post(cartController.sendOrders);
router.route('/getRestOrders/:restId').get(cartController.getRestOrders);
router.route('/getSingleOrder/:restId').get(cartController.getSingleOrder);

export default router;