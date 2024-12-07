const { Product } = require('../models');
const multer = require('multer');
const uploadToCloudinary = require('../middlewares/upload-cloud');
const upload = multer({ storage: multer.memoryStorage() });
const { body, validationResult } = require('express-validator');
const authMiddleware = require('../middlewares/auth');

/**
 * Creates a new product
 * @param {*} req
 * @param {*} res
 * @returns Object
 */
const createProduct = [
  authMiddleware, // Verifica autenticação
  upload.single('productImage'),
  uploadToCloudinary,

  // Validação dos dados
  body('name').notEmpty().withMessage('Nome é obrigatório'),
  body('price').isNumeric().withMessage('O preço deve ser numérico'),
  body('category').notEmpty().withMessage('Categoria é obrigatória'),
  body('color').notEmpty().withMessage('Cor é obrigatória'),
  body('stock').isInt({ min: 1 }).withMessage('Estoque deve ser um inteiro maior que 0'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const sellerId = req.user.id; // Obtém o ID do vendedor autenticado
      const productData = {
        ...req.body,
        sellerId,
        imageUrl: req.cloudinaryUrl || null,
      };

      const product = await Product.create(productData);
      return res.status(201).json(product);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
];

/**
 * Fetches all products
 * @param {*} req
 * @param {*} res
 * @returns Object
 */
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      order: [['createdAt', 'DESC']],
      include: ['seller'], // Inclui os detalhes do vendedor
    });

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * Gets a single product by its ID
 * @param {*} req
 * @param {*} res
 * @returns Object
 */
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findOne({
      where: { id },
      include: ['seller'], // Inclui os detalhes do vendedor
    });

    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * Updates a single product by its ID
 * @param {*} req
 * @param {*} res
 * @returns Object
 */
const updateProductById = [
  authMiddleware, // Verifica autenticação
  upload.single('productImage'),
  uploadToCloudinary,

  body('name').optional().notEmpty().withMessage('Nome não pode estar vazio'),
  body('price').optional().isNumeric().withMessage('O preço deve ser numérico'),
  body('category').optional().notEmpty().withMessage('Categoria não pode estar vazia'),
  body('color').optional().notEmpty().withMessage('Cor não pode estar vazia'),
  body('stock').optional().isInt({ min: 1 }).withMessage('Estoque deve ser um inteiro maior que 0'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { id } = req.params;
      const product = await Product.findOne({ where: { id } });

      if (!product) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }

      const updatedData = { ...req.body };

      if (req.cloudinaryUrl) {
        updatedData.imageUrl = req.cloudinaryUrl;
      }

      await product.update(updatedData);

      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
];

/**
 * Deletes a single product by its ID
 * @param {*} req
 * @param {*} res
 * @returns Object
 */
const deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.destroy({
      where: { id },
    });

    if (!deletedProduct) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
