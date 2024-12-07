const router = require('express').Router();

// Controller imports
const { categoryController, productController, authController } = require('../controllers');

// Category routes
router.get('/v1/categories', categoryController.getAllCategories);
router.post('/v1/categories', categoryController.createCategory);
router.get('/v1/categories/:id', categoryController.getCategoryById);
router.put('/v1/categories/:id', categoryController.updateCategory);
router.delete('/v1/categories/:id', categoryController.deleteCategory);

// Product routes
router.get('/v1/products', productController.getAllProducts);
router.post('/v1/products', productController.createProduct);
router.get('/v1/products/:id', productController.getProductById);
router.put('/v1/products/:id', productController.updateProductById);
router.delete('/v1/products/:id', productController.deleteProductById);

// Auth routes
router.post('/auth/login', authController.login);
router.post('/auth/cadastro', authController.cadastro);

module.exports = router;