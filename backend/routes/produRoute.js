const express =require('express');
const { 
    getAllProducts, 
    createProduct, 
    updateProduct,
    deleteProduct,
    getProductDetails
} = require('../controllers/prodController');
const { isAuthenticatedUser, authorizedRoles } = require('../middleware/auth');

const router = express.Router();



router.route('/product/new').post(isAuthenticatedUser,authorizedRoles("admin"), createProduct)
router.route('/products').get(isAuthenticatedUser,getAllProducts)
router.route('/product/:id').get(getProductDetails)
router.route('/product/:id').put(isAuthenticatedUser,updateProduct)
router.route('/product/:id').delete(isAuthenticatedUser,deleteProduct)

module.exports = router