const express =require('express');
const { 
    getAllProducts, 
    createProduct, 
    updateProduct,
    deleteProduct,
    getProductDetails,
    createProductReview,
    getProductReviews,
    deleteProductReviews,
    getAdminProducts
} = require('../controllers/prodController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

const router = express.Router();



router.route('/admin/product/new').post(isAuthenticatedUser,authorizeRoles("admin"), createProduct)
router.route('/products').get(getAllProducts);
router.route('/admin/products').get(isAuthenticatedUser,authorizeRoles("admin"),getAdminProducts);
router.route('/product/:id').get(getProductDetails)
router.route('/admin/product/:id').put(isAuthenticatedUser,authorizeRoles("admin"),updateProduct)
router.route('/admin/product/:id').delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct)
router.route('/review').put(isAuthenticatedUser,createProductReview)
router.route('/reviews').get(getProductReviews);
router.route('/reviews').delete(isAuthenticatedUser,deleteProductReviews);


module.exports = router