const express =require('express');
const { 
    getAllProducts, 
    createProduct, 
    updateProduct,
    deleteProduct,
    getProductDetails
} = require('../controllers/prodController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

const router = express.Router();



router.route('/product/new').post(isAuthenticatedUser,authorizeRoles("admin"), createProduct)
router.route('/products').get(isAuthenticatedUser,authorizeRoles("admin"),getAllProducts)
router.route('/product/:id').get(getProductDetails)
router.route('/product/:id').put(isAuthenticatedUser,authorizeRoles("admin"), isAuthenticatedUser,updateProduct)
router.route('/product/:id').delete(isAuthenticatedUser,authorizeRoles("admin"), isAuthenticatedUser,deleteProduct)

module.exports = router