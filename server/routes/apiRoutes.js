import { Router } from 'express';
import userController from '../controllers/user.controller';
import productController from '../controllers/product.controller';

const router = new Router();

//user routes
router.route('/login').post(userController.login);
router.route('/signup').post(userController.register);

//product routes
router.route('/postProduct').post(productController.postProduct);
router.route('/getSupplierProducts').post(productController.getSupplierProducts);
router.route('/removeProduct/:product_id').delete(productController.removeProduct);

export default router;